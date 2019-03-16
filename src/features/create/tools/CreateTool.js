import { Tool } from '../../../core/toolbox/Tool';
import { set, unset } from 'diagram-js/lib/util/Cursor';

export class CreateTool extends Tool {

    constructor (eventBus, toolbox, create) {
        super();
        this.eventBus = eventBus;
        this.toolbox = toolbox;
        this.create = create;
    }

    onDisable (event) {
        this.create.factory = undefined;
        this.create.config = undefined;
        this.create.clearPreview();
        unset();
    }

    onEnable (event) {
        this.create.factory = event.factory;
        this.create.config = event.config;
        set('grabbing');
    }

    onMouseDown (event) {

    }

    onMouseMove (event) {
        this.eventBus.fire('create.preview', event);
    }

    onMouseUp (event) {
        this.eventBus.fire('create.place', event);
        this.eventBus.fire('create.preview.clear', event);
        if (!event.originalEvent.shiftKey) {
            this.toolbox.activatePrevious();
        }
    }

    onOut (event) {
        this.eventBus.fire('create.preview.out', event);
    }

}
