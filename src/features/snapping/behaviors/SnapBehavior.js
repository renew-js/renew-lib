import { mid } from 'diagram-js/lib/features/snapping/SnapUtil';
import { Behavior } from '../../../core/eventBus/Behavior';


export class SnapBehavior extends Behavior {

    constructor (snapping) {
        super();
        this.snapping = snapping;
    }

    during (event) {
        if (event.context.shape) {
            const center = mid(event.context.shape);
            const snapped = this.snapping.snap(center);
            if (snapped.x) event.x = center.x;
            if (snapped.y) event.y = center.y;
        }
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
