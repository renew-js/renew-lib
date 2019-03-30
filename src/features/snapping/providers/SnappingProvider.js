import Snapping from 'diagram-js/lib/features/snapping/Snapping';
import { mid } from 'diagram-js/lib/features/snapping/SnapUtil';


export class SnappingProvider extends Snapping {

    constructor (eventBus, canvas) {
        super(eventBus, canvas);
        this.canvas = canvas;
        this.points = [];
        this.snapOrigins = [];

        this._asyncHide = () => {};
    }

    init (target) {
        target = !target ? this.canvas.getRootElement() : target;

        this.points = [];
        this.snapOrigins = [];

        target.children.forEach((child) => {
            const center = mid(child);
            if (center) {
                this.points.push(center);
            }
        });
    }

    snap (source, tolerance = 7) {
        const snapped = {};

        this.hide();

        this.snapOrigins.forEach((snapOrigin) => {
            this.points.forEach((point) => {
                const current = {
                    x: Math.abs(point.x - source.x - (snapOrigin.x || 0)),
                    y: Math.abs(point.y - source.y - (snapOrigin.y || 0)),
                };
                if (current.x <= tolerance) {
                    snapped.x = point.x - snapOrigin.x;
                    this.showSnapLine('vertical', point.x);
                } else if (current.y <= tolerance) {
                    snapped.y = point.y - snapOrigin.y;
                    this.showSnapLine('horizontal', point.y);
                }
            });
        });

        return snapped;
    }

    stop () {
        this.points = [];
        this.snapOrigins = [];
        this.hide();
    }

}
