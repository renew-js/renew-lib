import BaseSnapping from 'diagram-js/lib/features/snapping/Snapping';
import { mid, setSnapped } from 'diagram-js/lib/features/snapping/SnapUtil';

const HIGH_PRIORITY = 1500;


export class SnappingProvider extends BaseSnapping {

    constructor (eventBus, canvas) {
        super(eventBus, canvas);
        this.init(eventBus);
    }

    init (eventBus) {
        eventBus.on([
            'connect.move',
            'connect.hover',
            'connect.end',
        ], HIGH_PRIORITY, this.snapConnections);
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

}
