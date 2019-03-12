import { Tool } from '../../../core/toolbox/Tool';


export class PointerTool extends Tool {

    constructor (eventBus) {
        super();
        this.eventBus = eventBus;
    }

    onDisable (event) {
    }

    onEnable (event) {
    }

    onMouseDown (event) {
        this.eventBus.fire('pointer.select', event);
        this.eventBus.fire('pointer.lasso', event);
    }

    onMouseMove (event) {
        if (event.mouseDown) {
            this.eventBus.fire('selection.move', event);
        }
    }

    onMouseUp (event) {
    }

}
