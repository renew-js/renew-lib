import Diagram from 'diagram-js';

/**
 *
 */
export default class Viewer extends Diagram {
    constructor (options = {}) {
        // Create new container
        const container = document.createElement('div');
        container.className = 'rnw-container';

        // Pass container through options
        options.canvas = options.canvas || {};
        options.canvas.container = container;

        super(options);
        this.container = container;
    }

    attachTo (parentNode) {
        this.detach();

        parentNode.appendChild(this.container);

        this.get('canvas').resized();
    }

    detach () {
        const parentNode = this.container.parentNode;

        if (!parentNode) {
            return;
        }

        parentNode.removeChild(this.container);
    }

    getElements () {
        return this.get('elementRegistry').filter((el) => {
            return el.id != '__implicitroot';
        });
    }

    setElements (elements) {
        console.log(elements);
    }
}
