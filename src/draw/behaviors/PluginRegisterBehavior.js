import { Behavior } from '../../core/Behavior';


export class PluginRegisterBehavior extends Behavior {
    constructor (renderer) {
        super();
        this.renderer = renderer;
    }

    before (context) {
    }

    during (context) {
        this.renderer.registerMarker(context);
    }

    after (context) {
    }

}
