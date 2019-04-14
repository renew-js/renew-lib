import { CreateTool } from './CreateTool';


export class CreateLabelTool extends CreateTool {

    constructor (eventBus) {
        super(eventBus);
    }

    onMouseDown (event) {
        this.eventBus.fire('create.label', event);
    }

    onMouseMove (event) {

    }

    onMouseUp (event) {

    }

}
