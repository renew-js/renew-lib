import ElementFactory from 'diagram-js/lib/core/ElementFactory';


export class MetaFactory extends ElementFactory {
    constructor (eventBus, metaPluginManager, create, globalConnect) {
        super();
        this.eventBus = eventBus;
        this.pluginManager = metaPluginManager;
        this.dragging = create;
        this.connect = globalConnect;

        this.eventBus.on('metaPalette.create', this.onCreateElement.bind(this));
        this.eventBus.on('connection.add', this.onConnectRelation.bind(this));
    }

    onCreateElement (event) {
        switch (event.element.constructor.name) {
            case 'Classifier':
                this.onCreateClassifier(event);
                break;
            case 'Relation':
                this.onCreateRelation(event);
                break;
            case 'Text':
                this.onCreateText(event);
                break;
        }
    }

    onCreateClassifier (event) {
        const metaModel = event.plugin.getMetaModel();
        const stylesheet = event.plugin.getStylesheet();
        const style = stylesheet.styles[event.element.type];

        let clone = (object) => JSON.parse(JSON.stringify(object));

        this.dragging.start(event.click, this.createShape({
            type: metaModel.type + ':' + event.element.type,
            model: metaModel.type,
            metaType: event.element.type,
            metaLabels: event.element.labels,
            width: style.defaultDimension.width,
            height: style.defaultDimension.height,
            body: clone(style.representation),
            resizable: true,
        }));
    }

    onCreateRelation (event) {
        this.connect.toggle(event);
    }

    onConnectRelation (event) {
        const relationType = this.getConnectionType(event);

        if (!relationType) {
            return;
        }

        const [ model, type ] = relationType.split(':');
        const relation = this.pluginManager.getMetaModelElement(model, type);

        event.element.type = relationType;
        event.element.model = model;
        event.element.metaType = type;
        event.element.metaLabels = relation.labels;
        event.element.arrowStart = relation.arrowStart;
        event.element.arrowEnd = relation.arrowEnd;
        event.element.resizable = false;
    }

    getConnectionType (event) {
        const source = event.element.source;
        const metaModel = this.pluginManager.getMetaModel(source.model);

        for (const relation of metaModel.relations) {
            for (const type of relation.bind[source.metaType]) {
                if (this.isBindable(type, event.element.target)) {
                    return source.model + ':' + relation.type;
                }
            }
        }

        return null;
    }

    isBindable (type, target) {
        return type === '*' || type === target.type || type === target.metaType;
    }

    onCreateText (event) {
        console.log('TODO: create Text', event);
    }
}
