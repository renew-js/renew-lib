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
        this.create.clearPreview();
    }

    onEnable (event) {
        this.create.factory = event.factory;
        this.create.config = event.config;
    }

    onMouseDown (event) {

    }

    onMouseMove (event) {
        this.eventBus.fire('create.preview', event);
    }

    onMouseUp (event) {
        this.eventBus.fire('create.place', event);
    }
}
