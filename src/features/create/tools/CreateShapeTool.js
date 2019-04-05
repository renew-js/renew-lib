import { CreateTool } from './CreateTool';


export class CreateShapeTool extends CreateTool {

    constructor (eventBus, create) {
        super(eventBus);
        this.create = create;
    }

    onEnable (event) {
        super.onEnable(event);
        this.eventBus.fire('cursor.set.grabbing', event);

        event.elements = [ this.create.centeredShape(event.x, event.y) ];
        this.eventBus.fire('preview.init', event);

        this.isCreating = true;
    }

    onCreateDown (event) {
        event.elements = [ this.create.centeredShape(event.x, event.y) ];
        this.eventBus.fire('preview.init', event);
    }

    onCreateMove (event) {
        this.eventBus.fire('preview.move', event);
    }

    onCreateUp (event) {
        if (event.hover) {
            this.eventBus.fire('create.shape.center', event, true);
        }

        this.eventBus.fire('preview.clear', event);
    }

}
