import cloneDeep from 'lodash/cloneDeep';


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

        return { elements: cloneDeep(elements) };
    }

    getGraphics () {
        const rootElement = this.canvas.getRootElement();
        const graphicsElement = this.elementRegistry.getGraphics(rootElement);
        return graphicsElement.cloneNode(true);
    }

}
