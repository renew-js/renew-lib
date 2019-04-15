import { Tool } from '../../../core/toolbox/Tool';


export class PointerTool extends Tool {

    constructor (eventBus, toolbox, selection) {
        super();
        this.eventBus = eventBus;
        this.toolbox = toolbox;
        this.selection = selection;

        this.isSelecting = false;
        this.isMoving = false;
    }

    onDisable (event) {
        this.eventBus.fire('selection.clear');
        this.eventBus.fire('preview.clear');
        this.eventBus.fire('rubberBand.preview.clear');
    }

    onEnable (event) {
    }

    onMouseDown (event) {
        if (event.hover) {
            this.eventBus.fire('pointer.select', event);
        }
        event.elements = this.selection.get();
        if (event.hover) {
            if (event.rootStart) {
                this.isSelecting = true;
            } else {
                this.eventBus.fire('move.preview.init', event);
                this.isMoving = true;
            }
        }
    }

    onMouseMove (event) {
        event.elements = this.selection.get();

        if (event.mouseDown) {
            if (this.isMoving) {
                this.eventBus.fire('preview.move', event);
            } else if (this.isSelecting) {
                this.eventBus.fire('rubberBand.preview', event);
            }
        }
    }

    onMouseUp (event) {
        event.elements = this.selection.get();

        if (this.isMoving) {
            this.eventBus.fire('move.elements.by', event, true);
            this.eventBus.fire('preview.clear', event);
            this.isMoving = false;
        } else if (this.isSelecting) {
            this.eventBus.fire('rubberBand.select', event);
            this.eventBus.fire('rubberBand.preview.clear', event);
            this.isSelecting = false;
        }
    }

    onDoubleClick (event) {
        if (event.hover.type === 'label') {
            this.toolbox.activate('edit', { label: event.hover });
        }
    }

}
