import ElementFactory from 'diagram-js/lib/core/ElementFactory';
import { UID } from '../util/UID';


export class MetaElementFactory extends ElementFactory {

    constructor (metaPluginManager) {
        super();
        this.pluginManager = metaPluginManager;
    }

    createElement (type) {
        const element = this.pluginManager.getElement(type);

        const attributes = Object.assign({},
            element,
            this.pluginManager.getStyle(type),
            { type: type }
        );

        switch (element.constructor.name) {
            case 'Classifier':
                return this.createShape(attributes);
            case 'Relation':
                return this.createConnection(attributes);
            case 'Text':
                return this.createLabel(attributes);
        }
    }

    createShape (attributes) {
        return super.createShape({
            id: UID('shape'),
            businessObject: attributes,
            metaObject: attributes,
            width: attributes.defaultDimension.width,
            height: attributes.defaultDimension.height
        });
    }

    createConnection (attributes) {
        return super.createConnection({
            id: UID('connection'),
            businessObject: attributes,
            metaObject: attributes
        });
    }

    createLabel (attributes) {
        return super.createLabel({
            id: UID('label'),
            businessObject: attributes,
            metaObject: attributes
        });
    }

    /*
    onCreateClassifier (event) {
        const metaModel = event.plugin.getMetaModel();
        const stylesheet = event.plugin.getStylesheet();
        const style = stylesheet.styles[event.element.type];

        const clone = (object) => JSON.parse(JSON.stringify(object));

        const shape = this.createShape({
            class: event.element.constructor.name,
            type: metaModel.type + ':' + event.element.type,
            model: metaModel.type,
            metaType: event.element.type,
            metaLabels: event.element.labels,
            width: style.defaultDimension.width,
            height: style.defaultDimension.height,
            body: clone(style.representation),
            resizable: true,
        });

        this.dragging.start(event.click, shape);
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

        event.element.class = event.element.constructor.name;
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

    getIncrement () {
        return this._uid;
    }

    setIncrement (uid) {
        this._uid = uid;
    }
*/
}
