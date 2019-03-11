import { Tool } from '../../../core/toolbox/Tool';
import { set, unset } from 'diagram-js/lib/util/Cursor';


export class ConnectTool extends Tool {

    constructor (eventBus, policy, connect) {
        super();
        this.eventBus = eventBus;
        this.policy = policy;
        this.connect = connect;
        this.mouseDown = false;
    }

    onDisable (event) {
        this.connect.factory = undefined;
    }

    onEnable (event) {
        this.connect.factory = event.factory;
    }

    onMouseDown (event) {
        console.log('mousedown', event);
        this.mouseDown = true;
    }

    onMouseMove (event) {
        if (this.policy.allowed('connect.start')) {
            unset();
            if (this.mouseDown) {
                this.eventBus.fire('connect.preview', event);
            }
        } else {
            set('not-allowed');
        }
    }

    onMouseUp (event) {
        this.mouseDown = false;
        if (this.policy.allowed('connect.end')) {
            this.eventBus.fire('connect.shapes', event);
        }
        this.eventBus.fire('connect.preview.clear', event);
    }

}
