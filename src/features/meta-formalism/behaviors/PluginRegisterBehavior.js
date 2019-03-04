import { Behavior } from '../../../core/Behavior';


export class PluginRegisterBehavior extends Behavior {

    constructor (metaPluginManager) {
        super();
        this.pluginManager = metaPluginManager;
    }

    before (context) {

    }

    during (context) {
        this.pluginManager.register(event.plugin);
    }

    after (context) {

    }

}
