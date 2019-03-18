import { Behavior } from '../../core/eventBus/Behavior';


export class PluginRegisterBehavior extends Behavior {

    constructor (renderer) {
        super();
        this.renderer = renderer;
    }

    after (context) {
        this.renderer.registerMarker(context);
    }

}
