import { Behavior } from '../../../core/eventBus/Behavior';


export class FillOpaquenessBehavior extends Behavior {

    constructor (fillOpaqueness, selection) {
        super();
        this.fillOpaqueness = fillOpaqueness;
        this.selection = selection;
    }

    during (event, attribute) {
        this.fillOpaqueness.changeFillOpaqueness(attribute);
    }

    after (event) {}

}
