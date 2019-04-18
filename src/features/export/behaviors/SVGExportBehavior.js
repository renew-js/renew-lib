import { Behavior } from '../../../core/eventBus/Behavior';


export class SVGExportBehavior extends Behavior {

    constructor (eventBus, exporter, svgSerializer) {
        super();
        this.eventBus = eventBus;
        this.exporter = exporter;
        this.svgSerializer = svgSerializer;
    }

    during (context) {
        const data = this.exporter.getGraphics();
        const serializedData = this.svgSerializer.serialize(data);

        this.eventBus.fire('export', serializedData);
    }

}
