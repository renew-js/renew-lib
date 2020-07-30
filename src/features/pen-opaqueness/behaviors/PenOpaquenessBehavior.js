import { Behavior } from '../../../core/eventBus/Behavior';


export class PenOpaquenessBehavior extends Behavior {

    constructor (penOpaqueness, selection) {
        super();
        this.penOpaqueness = penOpaqueness;
        this.selection = selection;
    }

    during (event, attribute) {
        this.penOpaqueness.changePenOpaqueness(attribute);
    }

    after (event) {}

}
