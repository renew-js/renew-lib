import { Behavior } from '../../../core/eventBus/Behavior';


export class ImportBehavior extends Behavior {

    constructor (canvas, importer) {
        super();
        this.canvas = canvas;
        this.importer = importer;
    }

    before (context) {
        this.canvas._clear();
        this.canvas.getRootElement();
    }

    during (context) {
        // TODO: Block canvas interaction
        return this.importer.import(context.data);
    }

    after (context) {
        this.canvas.zoom('fit-viewport', 'auto');
    }

}
