import { Behavior } from '../../../core/eventBus/Behavior';


export class MetaImportBehavior extends Behavior {

    constructor (eventBus, metaPluginManager) {
        super();
        this.eventBus = eventBus;
        this.metaPluginManager = metaPluginManager;
    }

    during (context) {
        const plugin = this.metaPluginManager.getPlugin(context.model);
        const parser = plugin.getParser(context.format);
        const data = parser.parse(context.data);
        this.eventBus.fire('import', { data });
    }

}
