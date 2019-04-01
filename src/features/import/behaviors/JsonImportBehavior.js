import { Behavior } from '../../../core/eventBus/Behavior';


export class JsonImportBehavior extends Behavior {

    constructor (eventBus, canvas, jsonParser) {
        super();
        this.eventBus = eventBus;
        this.jsonParser = jsonParser;
    }

    during (context) {
        const data = this.jsonParser.parse(context.data);
        this.eventBus.fire('import', { data }, true);
    }

}
