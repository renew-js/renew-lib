import { Behavior } from '../../eventBus/Behavior';
import { toPoint } from 'diagram-js/lib/util/Event';
import { closest as domClosest } from 'min-dom';


export class HoverFixBehavior extends Behavior {

    constructor () {
        super();
    }

    during (event) {
        console.log(event);

        if (event.hover) {
            return;
        }

        const originalEvent = event.originalEvent;

        if (!(originalEvent instanceof MouseEvent)) {
            return;
        }

        const position = toPoint(originalEvent);

        // damn expensive operation, ouch!
        const target = document.elementFromPoint(position.x, position.y);
        const gfx = this.getGfx(target);

        if (gfx) {
            const hover = { element: this.elementRegistry.get(gfx), gfx: gfx };
            console.log('hoov2322323', hover);
        }
    }

    getGfx (target) {
        return domClosest(target, 'svg, .djs-element', true);
    }

}
