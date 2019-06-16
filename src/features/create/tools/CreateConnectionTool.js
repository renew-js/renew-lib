import { CreateTool } from './CreateTool';


export class CreateConnectionTool extends CreateTool {

    constructor (eventBus, rulePolicy) {
        super(eventBus);
        this.rulePolicy = rulePolicy;
    }

    onDisable (event) {
        super.onDisable(event);
        this.eventBus.fire('connect.preview.clear', event);
    }

    onCreateDown (event) {
        if (!this.rulePolicy.allowed('connect.origin')) {
            this.isCreating = false;
        }
    }

    onCreateMove (event) {
        if (event.mouseDown) {
            this.eventBus.fire('connect.preview', event);
        }
    }

    onCreateUp (event) {
        if (this.rulePolicy.allowed('connect.target')) {
            this.eventBus.fire('create.connection', event);
        }
        this.eventBus.fire('connect.preview.clear', event);
    }

}
