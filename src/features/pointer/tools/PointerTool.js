import { Tool } from '../../../core/toolbox/Tool';


export class PointerTool extends Tool {

    constructor (eventBus, selection) {
        super();
        this.eventBus = eventBus;
        this.selection = selection;
    }

    onDisable (event) {
        this.eventBus.fire('selection.clear');
    }

    onEnable (event) {
    }

    onMouseDown (event) {
        this.eventBus.fire('pointer.select', event);
        event.elements = this.selection.get();
        if (!event.rootStart) {
            this.eventBus.fire('move.preview.init', event);
        }
    }

    onMouseMove (event) {
        event.elements = this.selection.get();

        if (event.mouseDown) {
            if (event.rootStart) {
                this.eventBus.fire('rubberBand.preview', event);
            } else {
                this.eventBus.fire('preview.move', event);
            }
        }
    }

    onMouseUp (event) {
        event.elements = this.selection.get();

        this.eventBus.fire('move.elements.by', event);
        this.eventBus.fire('preview.clear', event);

        if (event.rootStart) {
            this.eventBus.fire('rubberBand.select', event);
            this.eventBus.fire('rubberBand.preview.clear', event);
        }
    }

}
