import ElementFactory from 'diagram-js/lib/core/ElementFactory';
import { Classifier } from 'renew-formalism/src/ontology/metamodel/Classifier';
import { Relation } from 'renew-formalism/src/ontology/metamodel/Relation';


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
        if (event.element instanceof Classifier) {
            this.onCreateClassifier(event);
        } else if (event.element instanceof  Relation) {
            this.onCreateRelation(event);
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
            width: style.defaultDimension.width,
            height: style.defaultDimension.height,
            body: clone(style.representation),
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
        const metaModel = this.pluginManager.getPlugin(model).getMetaModel();

        event.element.type = model + ':' + type;
        event.element.arrowStart = metaModel.getRelation(type).arrowStart;
        event.element.arrowEnd = metaModel.getRelation(type).arrowEnd;
    }

    getConnectionType (event) {
        const source = event.element.source;
        const target = event.element.target;

        let result = null;

        this.pluginManager.getMetaModel(source.model)
            .relations.forEach((relation) => {
            relation.bind[source.metaType].forEach((bindable) => {
                if (bindable === '*' || bindable === target.metaType) {
                    result = source.model + ':' + relation.type;
                }
            });
        });

        return result;
    }
}
