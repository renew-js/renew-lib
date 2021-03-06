import Client from 'renew-simulator-client';

export class ExternalSimulation {

    constructor (
        eventBus,
        simulationManager,
        metaPluginManager,
        metaFactory,
        canvas
    ) {
        this.eventBus = eventBus;
        this.simulationManager = simulationManager;
        this.metaPluginManager = metaPluginManager;
        this.metaFactory = metaFactory;
        this.canvas = canvas;
        this.client = new Client();

        this.formalisms = [];
        this.isInitialized = false;
        this.isContinuous = false;

        this.registerHandlers();
    }

    registerHandlers () {
        this.client
            .onDisconnect(() => {
                this.formalisms.forEach((formalismId) => {
                    this.simulationManager.deleteFormalism(formalismId);
                });
            })
            .onPluginUpdate((plugins) => {
                this.formalisms = [];
                plugins.forEach((plugin) => {
                    plugin.provides.forEach((formalism) => {
                        const externalFormalism = {
                            plugin: plugin.name,
                            id: formalism.id,
                            name: formalism.name,
                            metaModel: formalism.metaModel,
                        };
                        this.simulationManager.addFormalism(externalFormalism);
                        this.formalisms.push(formalism.id);
                    });
                });
            })
            .onSimulationError((error) => {
                // TODO Use Statusbar for this
                console.error('External simulation error:', error);
            })
            .onSimulationInit(() => {
                console.log('Simulation initialized');
                this.isInitialized = true;
                this.getMarking();
            })
            .onMarkingUpdate((newMarking) => {
                this.updateMarking(newMarking);
            });
    }

    getSerializedData (data, model, format) {
        data.title = +(new Date());

        const plugin = this.metaPluginManager.getPlugin(model);
        const serializer = plugin.getSerializer(format);

        if (!serializer) {
            return;
        }

        return serializer.serialize(data);
    }

    init (formalismId, netInstance) {
        if (!this.formalisms.includes(formalismId)) {
            return;
        }

        const formalism = this.simulationManager.activeFormalism;

        const serializedData = this.getSerializedData(
            netInstance,
            formalism.metaModel.type,
            formalism.metaModel.format
        );

        this.client.sendInit(
            formalism,
            netInstance,
            serializedData
        );
        this.start();
    }

    start () {
        this.isContinuous = true;
        this.client.sendStart();
        this.getMarking();
    }

    step () {
        this.client.sendStep();
        this.getMarking();
    }

    stop () {
        this.client.sendStop();
        this.isContinuous = false;
    }

    terminate () {
        if (this.isContinuous) {
            this.client.sendStop();
        }
        this.client.sendTerminate();
        this.isContinuous = false;
        this.isInitialized = false;
    }

    getMarking () {
        this.client.sendGetMarking();

        if (this.isContinuous && this.isInitialized) {
            window.requestAnimationFrame(this.getMarking.bind(this));
        }
    }

    updateMarking (newMarking) {
        newMarking.elements.forEach(this.updateLabel.bind(this));
        if (newMarking.isHalted) {
            this.isContinuous = false;
        }
    }

    getLabel (labelData) {
        const elementRegistry = this.canvas.getElementRegistry();
        const parent = elementRegistry.get(labelData.parentId);

        for (let i = parent.labels.length - 1; i >= 0; i--) {
            if (parent.labels[i].metaObject
                && parent.labels[i].metaObject.type === labelData.type) {
                return elementRegistry.get(parent.labels[i].id);
            }
        }
    }

    updateLabel (labelData) {
        const label = this.getLabel(labelData);

        if (label) {
            label.text = labelData.text + '';
            this.updateGraphics(label, 'shape');
        } else if (labelData.text) {
            this.createLabel(labelData);
        }
    }

    createLabel (labelData) {
        const parent = this.canvas.getElementRegistry().get(labelData.parentId);
        const label = this.metaFactory.createElement(labelData.type);

        label.width = 150; // TODO get default dimensions from somewhere
        label.height = 50;

        label.x = parent.x || 0;
        label.x -= (label.width - (parent.width || 0)) / 2;
        label.y = parent.y || 0;
        label.y -= (label.height - (parent.height || 0)) / 2;
        label.text = labelData.text + '';

        parent.labels.push(label);
        this.canvas.addShape(label, parent);
    }

    updateGraphics (element, type) {
        const gfx = this.canvas.getElementRegistry().getGraphics(element.id);

        this.canvas.getGraphicsFactory()
            .update(type || element.type, element, gfx);
    }

}
