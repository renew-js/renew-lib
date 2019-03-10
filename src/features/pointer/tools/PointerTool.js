import { Tool } from '../../../core/toolbox/Tool';


export class PointerTool extends Tool {
    constructor (lassoTool, canvas) {
        super();
        this.canvas = canvas;
        this.lassoTool = lassoTool;
    }

    onDisable (event) {
    }

    onEnable (event) {
    }

    onMouseDown (event) {
        if (this.isRootElement(event.hover)) {
            this.lassoTool.activateLasso(event.originalEvent);
        }
    }

    isRootElement (element) {
        return element && element.id === this.canvas._rootElement.id;
    }

    onMouseMove (event) {
    }

    onMouseUp (event) {
    }
}
