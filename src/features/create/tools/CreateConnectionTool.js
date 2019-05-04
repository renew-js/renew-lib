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
        if (!this.rulePolicy.allowed('connect.start')) {
            this.isCreating = false;
        }
    }

    onCreateMove (event) {
        // if (this.rulePolicy.allowed('connect.start')) {
        //     this.eventBus.fire('cursor.unset');
        if (event.mouseDown) {
            this.eventBus.fire('connect.preview', event);
        }
        // } else {
        //     this.eventBus.fire('cursor.set', { cursor: 'not-allowed' });
        // }
    }

    onCreateUp (event) {
        if (this.rulePolicy.allowed('connect.end')) {
            this.eventBus.fire('create.connection', event);
        }
        this.eventBus.fire('connect.preview.clear', event);
    }

}
