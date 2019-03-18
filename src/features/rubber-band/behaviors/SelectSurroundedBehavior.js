import { getEnclosedElements } from 'diagram-js/lib/util/Elements';
import { Behavior } from '../../../core/eventBus/Behavior';


export class SelectSurroundedBehavior extends Behavior {

    constructor (rubberBand, selection, elementRegistry) {
        super();
        this.rubberBand = rubberBand;
        this.selection = selection;
        this.elementRegistery = elementRegistry;
    }

    before (event) {
        event.surrounded = getEnclosedElements(
            this.elementRegistery.getAll(),
            this.rubberBand.rect
        );
    }

    during (event) {
        this.selection.select(Object.values(event.surrounded));
    }

}
