export class Exporter {

    constructor (elementRegistry, canvas) {
        this.elementRegistry = elementRegistry;
        this.canvas = canvas;
    }

    getExport () {
        const refs = [ 'parent', 'source', 'target' ];
        const rootElement = this.canvas.getRootElement();
        const elements = this.elementRegistry.filter((el) => {
            // Get all elements except root
            return el.id !== rootElement.id;
        }).map((element) => {
            // Serialize object-refs (see diagram-js/lib/model/index.js)
            refs.forEach((ref) => {
                if (element.hasOwnProperty(ref)) {
                    element[ref + 'Id'] = element[ref].id;
                }
            });
            return element;
        });

        return { elements: Object.assign(elements, {}) };
    }

    getGraphics () {
        const rootElement = this.canvas.getRootElement();
        const graphicsElement = this.elementRegistry.getGraphics(rootElement);

        const ns = 'http://www.w3.org/2000/svg';
        const doc = document.createElementNS(ns, 'svg');
        doc.appendChild(graphicsElement.cloneNode(true));
        doc.appendChild(this.canvas._defs.cloneNode(true));

        return doc;
    }

}
