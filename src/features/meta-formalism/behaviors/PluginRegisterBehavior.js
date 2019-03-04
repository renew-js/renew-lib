import { Behavior } from '../../../core/Behavior';


export class PluginRegisterBehavior extends Behavior {

    constructor (metaPluginManager) {
        super();
        this.pluginManager = metaPluginManager;
    }

    during (context) {
        this.pluginManager.register(context.plugin);
    }

}
