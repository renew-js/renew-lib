export default class BaseExporter {

    constructor (elementRegistry, metaFactory, canvas) {
        this.elementRegistry = elementRegistry;
        this.metaFactory = metaFactory;
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

        const increment = this.metaFactory.getIncrement();

        return { elements, increment };
    }

}
