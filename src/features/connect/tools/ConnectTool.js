import { Tool } from '../../../core/toolbox/Tool';


export class ConnectTool extends Tool {

    constructor (eventBus, policy, connect) {
        super();
        this.eventBus = eventBus;
        this.policy = policy;
        this.connect = connect;

        this.isConnecting = false;
    }

    onDisable (event) {
        this.eventBus.fire('connect.factory.reset', event);
    }

    onEnable (event) {
        this.eventBus.fire('connect.factory.set', event);
    }

    onMouseDown (event) {
        if (event.hover) {
            this.isConnecting = true;
        }
    }

    onMouseMove (event) {
        if (this.isConnecting) {
            if (this.policy.allowed('connect.start')) {
                this.eventBus.fire('cursor.unset');
                if (event.mouseDown) {
                    this.eventBus.fire('connect.preview', event);
                }
            } else {
                this.eventBus.fire('cursor.set', { cursor: 'not-allowed' });
            }
        }
    }

    onMouseUp (event) {
        if (this.isConnecting) {
            if (this.policy.allowed('connect.end')) {
                this.eventBus.fire('connect.elements', event);
            }
            this.eventBus.fire('connect.preview.clear', event);
            this.isConnecting = false;
        }
    }

}
