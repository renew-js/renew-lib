import { Tool } from '../../../core/toolbox/Tool';
import { CardinalOrientation } from '../../orientation/CardinalOrientation';


export class PointerTool extends Tool {

    constructor (eventBus, toolbox, selection) {
        super();
        this.eventBus = eventBus;
        this.toolbox = toolbox;
        this.selection = selection;

        this.isSelecting = false;
        this.isMoving = false;
        this.isResizing = false;
    }

    onDisable (event) {
        this.eventBus.fire('selection.clear');
        this.eventBus.fire('preview.clear');
        this.eventBus.fire('rubberBand.preview.clear');
    }

    onEnable (event) {
    }

    onMouseDown (event) {
        if (event.hover && event.hover.type === 'handle') {
            this.isResizing = event.hover.orientation.direction;
        } else {
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
    }

    onMouseMove (event) {
        event.elements = this.selection.get();

        if (event.mouseDown) {
            if (this.isMoving) {
                this.eventBus.fire('preview.move', event);
            } else if (this.isSelecting) {
                this.eventBus.fire('rubberBand.preview', event);
            } else if (this.isResizing) {
                switch (this.isResizing) {
                    case CardinalOrientation.NORTH_WEST:
                        this.eventBus.fire('resize.element.nw', event, true);
                        break;
                    case CardinalOrientation.NORTH_EAST:
                        this.eventBus.fire('resize.element.ne', event, true);
                        break;
                    case CardinalOrientation.SOUTH_EAST:
                        this.eventBus.fire('resize.element.se', event, true);
                        break;
                    case CardinalOrientation.SOUTH_WEST:
                        this.eventBus.fire('resize.element.sw', event, true);
                        break;
                }
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
        } else if (this.isResizing) {
            this.handleResizeCursor(event.hover);
            this.isResizing = false;
        }
    }

    onDoubleClick (event) {
        if (event.hover.type === 'label') {
            this.toolbox.activate('edit', { label: event.hover });
        }
    }

    onHover (event) {
        if (this.isResizing) return;
        this.handleResizeCursor(event.element);
    }

    handleResizeCursor (element) {
        if (element && element.type === 'handle') {
            switch (element.orientation.direction) {
                case CardinalOrientation.NORTH_WEST:
                    this.eventBus.fire('cursor.set.nwse');
                    break;
                case CardinalOrientation.NORTH_EAST:
                    this.eventBus.fire('cursor.set.nesw');
                    break;
                case CardinalOrientation.SOUTH_EAST:
                    this.eventBus.fire('cursor.set.nwse');
                    break;
                case CardinalOrientation.SOUTH_WEST:
                    this.eventBus.fire('cursor.set.nesw');
                    break;
            }
        } else {
            this.eventBus.fire('cursor.unset');
        }
    }

    onOut (event) {
        if (this.isResizing) return;

        if (event.element && event.element.type === 'handle') {
            switch (event.element.orientation.direction) {
                case CardinalOrientation.NORTH_WEST:
                    this.eventBus.fire('cursor.unset');
                    break;
                case CardinalOrientation.NORTH_EAST:
                    this.eventBus.fire('cursor.unset');
                    break;
                case CardinalOrientation.SOUTH_EAST:
                    this.eventBus.fire('cursor.unset');
                    break;
                case CardinalOrientation.SOUTH_WEST:
                    this.eventBus.fire('cursor.unset');
                    break;
            }
        }
    }

}
