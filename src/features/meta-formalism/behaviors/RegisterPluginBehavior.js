import { Behavior } from '../../../core/Behavior';


export class RegisterPluginBehavior extends Behavior {

    constructor (metaPluginManager) {
        super();
        this.pluginManager = metaPluginManager;
    }

    start (event) {
        this.pluginManager.register(event.plugin);
    }

}
