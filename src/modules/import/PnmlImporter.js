import cloneDeep from 'lodash/cloneDeep';


export default class PnmlImporter {

    constructor (baseImporter, metaPluginManager) {
        this.baseImporter = baseImporter;
        this.metaPluginManager = metaPluginManager;
        this.parser = new DOMParser();
        this.elements = null;
        this.newElement = null;
    }

    /**
     * Import PNML
     * @param  {string} pnml The import data
     * @return {object}      The parsed import data
     */
    import (pnml) {
        const data = this.parsePnml(pnml);
        this.baseImporter.import(data);
        return data;
    }

    parsePnml (pnml) {
        this.elements = [];
        const dom = this.parser.parseFromString(pnml, 'application/xml');

        const rootElement = dom.documentElement;
        if (rootElement.nodeName !== 'pnml'
            || !rootElement.hasChildNodes()) {
            throw new Error('Invalid document type.');
        }

        const netElement = rootElement.firstElementChild;
        if (netElement.nodeName !== 'net'
            || !netElement.hasChildNodes()) {
            throw new Error('Empty net.');
        }

        const treeWalker = document.createTreeWalker(
            netElement,
            NodeFilter.SHOW_ELEMENT
        );

        let title = null;
        while (treeWalker.nextNode()) {
            switch (treeWalker.currentNode.nodeName) {
                case 'place':
                case 'transition':
                case 'arc':
                    this.createElement(treeWalker.currentNode);
                    break;
                case 'position':
                    this.setPosition(treeWalker.currentNode);
                    break;
                case 'dimension':
                    this.setDimension(treeWalker.currentNode);
                    break;
                case 'name':
                    title = this.getName(treeWalker.currentNode);
                    break;
                default:
                    // TODO add more shapes
            }
        }

        return {
            elements: this.elements,
            increment: 12,
            title,
        };
    }

    createElement (node) {
        switch (node.nodeName) {
            case 'place':
                this.newElement = this.createPlace(node);
                break;
            case 'transition':
                this.newElement = this.createTransition(node);
                break;
            case 'arc':
                this.newElement = this.createArc(node);
                break;
            default:
                // TODO add more shapes
        }
        this.elements.push(this.newElement);
    }

    createPlace (node) {
        const placeStyle = this.metaPluginManager
            .getStylesheetStyle('pt', 'place');
        return {
            id: 'import_' + node.attributes.id.value,
            class: 'Classifier',
            type: 'pt:place',
            model: 'pt',
            metaType: 'place',
            // metaLabels: , TODO
            body: cloneDeep(placeStyle.representation),
            resizable: true,
            parentId: '__implicitroot', // TODO
        };
    }

    createTransition (node) {
        const transitionStyle = this.metaPluginManager
            .getStylesheetStyle('pt', 'transition');
        return {
            id: 'import_' + node.attributes.id.value,
            class: 'Classifier',
            type: 'pt:transition',
            model: 'pt',
            metaType: 'transition',
            // metaLabels: , TODO
            body: cloneDeep(transitionStyle.representation),
            resizable: true,
            parentId: '__implicitroot', // TODO
        };
    }

    createArc (node) {
        return {
            id: 'import_' + node.attributes.id.value,
            class: 'Connection',
            type: 'pt:arc',
            model: 'pt',
            metaType: 'arc',
            // metaLabels: , TODO
            parentId: '__implicitroot', // TODO
            sourceId: 'import_' + node.attributes.source.value,
            targetId: 'import_' + node.attributes.target.value,
        };
    }

    setPosition (node) {
        this.newElement.x = parseInt(node.attributes.x.value);
        this.newElement.y = parseInt(node.attributes.y.value);
    }

    setDimension (node) {
        const width = parseInt(node.attributes.x.value);
        const height = parseInt(node.attributes.y.value);
        this.newElement.width = width;
        this.newElement.height = height;
        if (this.newElement.metaType === 'place') {
            this.newElement.body.attributes.rx
                = this.newElement.body.proportions.rx * width;
            this.newElement.body.attributes.ry
                = this.newElement.body.proportions.ry * height;
            this.newElement.body.attributes.cx
                = this.newElement.body.proportions.cx * width;
            this.newElement.body.attributes.cy
                = this.newElement.body.proportions.cy * height;
        } else {
            this.newElement.body.attributes.x
                = this.newElement.body.proportions.x * width;
            this.newElement.body.attributes.y
                = this.newElement.body.proportions.y * height;
            this.newElement.body.attributes.width
                = this.newElement.body.proportions.width * width;
            this.newElement.body.attributes.height
                = this.newElement.body.proportions.height * height;
        }
    }

    getName (node) {
        return node.firstElementChild.firstChild.nodeValue;
    }

}
