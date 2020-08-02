import { Behavior } from '../../../core/eventBus/Behavior';


export class LineWidthBehavior extends Behavior {

    constructor (lineWidth, selection) {
        super();
        this.lineWidth = lineWidth;
        this.selection = selection;
    }

    during (event, width) {
        this.lineWidth.lineWidth(width);
    }

    after (event) {}

}
