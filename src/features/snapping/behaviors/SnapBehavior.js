import { mid } from 'diagram-js/lib/features/snapping/SnapUtil';
import { Behavior } from '../../../core/eventBus/Behavior';


export class SnapBehavior extends Behavior {

    constructor (eventBus, snapping) {
        super();
        this.eventBus = eventBus;
        this.snapping = snapping;
    }

    during (event) {
        if (event.context.shape) {
            event.snapped = this.snapping.snap(event);
            this.eventBus.fire('snapping.snapped', event);
        }
    }

    stop (event) {
        this.snapping.stop();
    }

    /*
    init (eventBus) {
        eventBus.on(
            [ 'connect.move', 'connect.hover', 'connect.end' ],
            HIGH_PRIORITY,
            this.snapConnections
        );
    }

    snapConnections (event) {
        event.context.sourcePosition = mid(event.context.source);
        if (event.context.target && event.context.target.body) {
            const position = mid(event.context.target);
            setSnapped(event, 'x', position.x);
            setSnapped(event, 'y', position.y);
        }
    }

    addTargetSnaps (snapPoints, source, target) {
        const siblings = this.getSiblings(source, target);

        siblings.forEach((sibling) => {
            if (!sibling.waypoints) {
                snapPoints.add('mid', mid(sibling));
            }
        });
    }
    */

}
