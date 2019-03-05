export default class PnmlExporter {

    constructor (baseExporter) {
        this.baseExporter = baseExporter;
        this.xmlSerializer = new XMLSerializer();
        this.doc = null;
    }

    /**
     * Get PNML export
     * @param  {string} [name] The PNML document name
     * @return {string}      The export data
     */
    getExport (name = null) {
        const data = this.baseExporter.getExport();
        return this.createPnml(data, name);
    }

    createPnml (data, name) {
        const ns = 'http://www.informatik.hu-berlin.de/top/pntd/ptNetb';
        const doc = document.implementation.createDocument(ns, 'pnml', null);
        const netElement = doc.createElement('net');
        netElement.setAttribute('id', 'netId' + Date.now());

        let metaElement;
        let graphicsElement;
        let positionElement;
        let dimensionElement;
        data.elements.forEach((element) => {
            metaElement = doc.createElement(element.metaType || element.type);
            metaElement.setAttribute('id', element.id);

            graphicsElement = doc.createElement('graphics');

            if (element.x && element.y) {
                positionElement = doc.createElement('position');
                positionElement.setAttribute('x', element.x);
                positionElement.setAttribute('y', element.y);
                graphicsElement.appendChild(positionElement);
            }

            if (element.width && element.height) {
                dimensionElement = doc.createElement('dimension');
                dimensionElement.setAttribute('x', element.width);
                dimensionElement.setAttribute('y', element.height);
                graphicsElement.appendChild(dimensionElement);
            }

            if (element.sourceId && element.targetId) {
                metaElement.setAttribute('source', element.sourceId);
                metaElement.setAttribute('target', element.targetId);
            }

            metaElement.appendChild(graphicsElement);
            netElement.appendChild(metaElement);
        });

        if (name) {
            const nameElement = doc.createElement('name');
            const textElement = doc.createElement('text');
            const textNode = doc.createTextNode(name);
            textElement.appendChild(textNode);
            nameElement.appendChild(textElement);
            netElement.appendChild(nameElement);
        }

        doc.documentElement.appendChild(netElement);
        return this.xmlSerializer.serializeToString(doc);
    }


}
