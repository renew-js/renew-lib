import { Tool } from '../../../core/toolbox/Tool';


export class PointerTool extends Tool {

    constructor (eventBus, selection) {
        super();
        this.eventBus = eventBus;
        this.selection = selection;
    }

    onDisable (event) {
        this.selection.clear();
    }

    onEnable (event) {
    }

    onMouseDown (event) {
        this.eventBus.fire('pointer.select', event);
    }

    onMouseMove (event) {
        if (event.mouseDown) {
            if (event.rootStart) {
                this.eventBus.fire('rubberBand.preview', event);
            } else if (!event.root) {
                this.eventBus.fire('move.preview', event);
            }
        }
    }

    onMouseUp (event) {
        this.eventBus.fire('selection.move', event);

        if (event.rootStart) {
            this.eventBus.fire('rubberBand.preview.clear', event);
            this.eventBus.fire('rubberBand.select', event);
        }
    }

}
