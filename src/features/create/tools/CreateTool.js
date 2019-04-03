import { Tool } from '../../../core/toolbox/Tool';

export class CreateTool extends Tool {

    constructor (eventBus) {
        super();
        this.eventBus = eventBus;
    }

    onDisable (event) {
        this.eventBus.fire('factory.reset', event);
        this.eventBus.fire('cursor.unset', event);
    }

    onEnable (event) {
        this.eventBus.fire('factory.set', event);
        this.eventBus.fire('cursor.set.grabbing', event);
        this.eventBus.fire('create.preview.init', event);
    }

    onMouseDown (event) {

    }

    onMouseMove (event) {
        this.eventBus.fire('create.preview', event);
        this.eventBus.fire('create.marker.update', event);
    }

    onMouseUp (event) {
        if (event.hover) {
            this.eventBus.fire('create.element.center', event, true);
        }
        this.eventBus.fire('create.marker.clear', event);
        this.eventBus.fire('create.preview.clear', event);

        if (!event.originalEvent.shiftKey) {
            this.eventBus.fire('toolbox.activate', { tool: 'pointer' });
        } else {
            this.eventBus.fire('create.preview.init', event);
        }
    }

    onOut (event) {
        this.eventBus.fire('create.marker.out', event);
    }

}
