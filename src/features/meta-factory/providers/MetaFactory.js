import ElementFactory from 'diagram-js/lib/core/ElementFactory';
import { uid } from '../../../core/util/Uid';


export class MetaFactory extends ElementFactory {

    constructor (metaPluginManager) {
        super();
        this.pluginManager = metaPluginManager;
        this.defaultAttributes = {};
    }

    setType (metaType) {
        this.defaultAttributes = this.getAttributes(metaType);
    }

    createElement (metaType) {
        const attributes = this.getAttributes(metaType);

        switch (this.getType(metaType)) {
            case 'shape':
                return this.createShape(attributes);
            case 'connection':
                return this.createConnection(attributes);
            case 'label':
                return this.createLabel(attributes);
        }
    }

    getAttributes (metaType) {
        const metaObject = JSON.parse(JSON.stringify(Object.assign({},
            this.pluginManager.getElement(metaType),
            this.pluginManager.getStyle(metaType),
            { type: metaType }
        )));

        switch (this.getType(metaType)) {
            case 'shape':
                return {
                    businessObject: metaObject,
                    metaObject: metaObject,
                    width: metaObject.defaultDimension.width,
                    height: metaObject.defaultDimension.height,
                };
            case 'connection':
                return {
                    businessObject: metaObject,
                    metaObject: metaObject,
                };
            case 'label':
                return {
                    businessObject: metaObject,
                    metaObject: metaObject,
                    width: metaObject.defaultDimension.width,
                    height: metaObject.defaultDimension.height,
                };
        }
    }

    getType (metaType) {
        const element = this.pluginManager.getElement(metaType);

        switch (element.constructor.name) {
            case 'Classifier':
                return 'shape';
            case 'Relation':
                return 'connection';
            case 'Text':
                return 'label';
        }
    }

    createShape (attributes) {
        return super.createShape(Object.assign({
            id: uid('shape'),
            type: 'shape',
        }, this.defaultAttributes, attributes));
    }

    createConnection (attributes) {
        return super.createConnection(Object.assign({
            id: uid('connection'),
            type: 'connection',
        }, this.defaultAttributes, attributes));
    }

    createLabel (attributes) {
        return super.createConnection(Object.assign({
            id: uid('label'),
            type: 'label',
        }, this.defaultAttributes, attributes));
    }

}
