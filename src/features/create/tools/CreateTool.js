import { Tool } from '../../../core/toolbox/Tool';

export class CreateTool extends Tool {

    constructor (eventBus, create) {
        super();
        this.eventBus = eventBus;

        this.create = create;
    }

    onDisable (event) {
        this.create.factory = undefined;
        this.create.config = undefined;

        this.eventBus.fire('create.cursor.unset', event);
    }

    onEnable (event) {
        this.create.factory = event.factory;
        this.create.config = event.config;


        this.eventBus.fire('create.cursor.grabbing', event);
    }

    onMouseDown (event) {
        this.eventBus.fire('create.element.init', event);
    }

    onMouseMove (event) {
        this.eventBus.fire('create.preview', event);
        this.eventBus.fire('create.marker.update', event);
    }

    onMouseUp (event) {
        this.eventBus.fire('create.element', event);
        this.eventBus.fire('create.marker.clear', event);
        this.eventBus.fire('preview.clear', event);

        if (!event.originalEvent.shiftKey) {
            this.eventBus.fire('toolbox.previous', event);
        }
    }

    onOut (event) {
        this.eventBus.fire('create.marker.out', event);
    }

}
