import { Tool } from '../../../core/toolbox/Tool';


export class ConnectTool extends Tool{
    constructor (connect) {
        super();
        this.connect = connect;
    }

    onDisable (event) {
        this.connect.factory = undefined;
    }

    onEnable (event) {
        this.connect.factory = event.factory;
    }

    onMouseDown (event) {
    }

    onMouseMove (event) {
    }

    onMouseUp (event) {
    }
}
