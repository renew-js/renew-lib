import ElementFactory from 'diagram-js/lib/core/ElementFactory';
import { UID } from '../util/UID';


export class MetaElementFactory extends ElementFactory {

    constructor (metaPluginManager) {
        super();
        this.pluginManager = metaPluginManager;
    }

    createElement (metaType) {
        const attributes = Object.assign({},
            this.pluginManager.getElement(metaType),
            this.pluginManager.getStyle(metaType)
        );

        switch (this.getType(metaType)) {
            case 'Shape':
                return this.createShape(attributes);
            case 'Connection':
                return this.createConnection(attributes);
            case 'Label':
                return this.createLabel(attributes);
        }
    }

    getType (metaType) {
        const element = this.pluginManager.getElement(metaType);

        switch (element.constructor.name) {
            case 'Classifier':
                return 'Shape';
            case 'Relation':
                return 'Connection';
            case 'Text':
                return 'Label';
        }
    }

    createShape (attributes) {
        return super.createShape({
            id: UID('shape'),
            type: 'Shape',
            businessObject: attributes,
            metaObject: attributes,
            width: attributes.defaultDimension.width,
            height: attributes.defaultDimension.height
        });
    }

    createConnection (attributes) {
        return super.createConnection({
            id: UID('connection'),
            type: 'Connection',
            businessObject: attributes,
            metaObject: attributes
        });
    }

    createLabel (attributes) {
        return super.createLabel({
            id: UID('label'),
            type: 'Label',
            businessObject: attributes,
            metaObject: attributes,
            width: attributes.defaultDimension.width,
            height: attributes.defaultDimension.height
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
