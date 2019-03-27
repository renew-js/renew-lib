import { Behavior } from '../../../core/eventBus/Behavior';


export class JsonExportBehavior extends Behavior {

    constructor (eventBus, exporter, jsonSerializer) {
        super();
        this.eventBus = eventBus;
        this.exporter = exporter;
        this.jsonSerializer = jsonSerializer;
    }

    during (context) {
        let data = this.exporter.getExport();
        data = Object.assign(data, context.additionalData || {});

        const serializedData = this.jsonSerializer.serialize(data);

        this.eventBus.fire('export', serializedData);
    }

}
