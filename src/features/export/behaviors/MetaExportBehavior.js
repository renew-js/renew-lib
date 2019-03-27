import { Behavior } from '../../../core/eventBus/Behavior';


export class MetaExportBehavior extends Behavior {

    constructor (eventBus, exporter, metaPluginManager) {
        super();
        this.eventBus = eventBus;
        this.exporter = exporter;
        this.metaPluginManager = metaPluginManager;
    }

    during (context) {
        let data = this.exporter.getExport();
        data = Object.assign(data, context.additionalData || {});

        const plugin = this.metaPluginManager.getPlugin(context.model);
        const serializer = plugin.getSerializer(context.format);
        const serializedData = serializer.serialize(data);

        this.eventBus.fire('export', serializedData);
    }

}
