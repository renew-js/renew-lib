import { Tool } from '../../../core/toolbox/Tool';


export class HandTool extends Tool {

    constructor (eventBus) {
        super();
        this.eventBus = eventBus;
    }

    onDisable (event) {
    }

    onEnable (event) {
    }

    onMouseDown (event) {
    }

    onMouseMove (event) {
        if (event.mouseDown) {
            this.eventBus.fire('hand.move', event);
        }
    }

    onMouseUp (event) {
    }
}
