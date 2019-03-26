import { Behavior } from '../../../core/eventBus/Behavior';


export class JsonImportBehavior extends Behavior {

    constructor (eventBus, canvas, jsonImportParser) {
        super();
        this.eventBus = eventBus;
        this.jsonImportParser = jsonImportParser;
    }

    during (context) {
        const data = this.jsonImportParser.parse(context.data);
        this.eventBus.fire('import', { data });
    }

}
