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
            width: style.defaultDimension.width,
            height: style.defaultDimension.height,
            body: clone(style.representation),
        }));
    }

    onCreateRelation (event) {
        this.connect.toggle(event);
    }

    onConnectRelation (event) {
        const [ model, type ] = this.getConnectionType(event).split(':');

        const metaModel = this.pluginManager.getPlugin(model).getMetaModel();

        event.element.type = model + ':' + type;
        event.element.arrowStart = metaModel.getRelation(type).arrowStart;
        event.element.arrowEnd = metaModel.getRelation(type).arrowEnd;
    }

    getConnectionType (event) {
        const [ srcModel, srcType ] = event.element.source.type.split(':');
        const [ destModel, destType ] = event.element.target.type.split(':');

        const srcPlugin = this.pluginManager.getPlugin(srcModel);
        const destPlugin = this.pluginManager.getPlugin(destModel);

        let result = null;

        const relations = srcPlugin.getMetaModel().relations;
        relations.forEach((relation) => {
            relation.bind[ srcType ].forEach((bindable) => {
                console.log('bindable?', bindable, destType);
                if (bindable === '*' || bindable === destType) {
                    result = srcPlugin.getMetaModel().type + ':' + relation.type;
                }
            });
        });

        return result;
    }
}
