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

    onMouseMove (event) {
        const metaObject = event.context.factory.defaultAttributes.metaObject;
        const hover = event.hover;
        const hoverStart = event.hoverStart;
        const context = { metaObject, hover, hoverStart };

        super.onMouseMove(event);

        if (event.root) {
            this.eventBus.fire('cursor.unset');
        } else if (this.isCreating) {
            if (this.rulePolicy.allowed('connect.target', context)) {
                this.eventBus.fire('cursor.set', { cursor: 'crosshair' });
            } else if (!event.root) {
                this.eventBus.fire('cursor.set', { cursor: 'not-allowed' });
            }
        } else {
            if (this.rulePolicy.allowed('connect.source', context)) {
                this.eventBus.fire('cursor.set', { cursor: 'crosshair' });
            } else {
                this.eventBus.fire('cursor.set', { cursor: 'not-allowed' });
            }
        }
    }

    onCreateDown (event) {
        const metaObject = event.context.factory.defaultAttributes.metaObject;
        const hover = event.hover;
        const hoverStart = event.hoverStart;
        const context = { metaObject, hover, hoverStart };

        if (!this.rulePolicy.allowed('connect.source', context)) {
            this.isCreating = false;
        }
    }

    onCreateMove (event) {
        if (event.mouseDown) {
            this.eventBus.fire('connect.preview', event);
        }
    }

    onCreateUp (event) {
        const metaObject = event.context.factory.defaultAttributes.metaObject;
        const hover = event.hover;
        const hoverStart = event.hoverStart;
        const context = { metaObject, hover, hoverStart };

        if (this.rulePolicy.allowed('connect.target', context)) {
            this.eventBus.fire('create.connection', event);
        }
        this.eventBus.fire('connect.preview.clear', event);
    }

}
