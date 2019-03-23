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

        target.children.forEach(child => this.points.push(mid(child)));
    }

    snap (source, tolerance = 7) {
        const snapped = {};

        this.hide();

        this.snapOrigins.forEach((snapOrigin) => {
            this.points.forEach((point) => {
                if (Math.abs(point.x - source.x - snapOrigin.x) <= tolerance) {
                    snapped.x = point.x - snapOrigin.x;
                    this.showSnapLine('vertical', point.x);
                } else if (Math.abs(point.y - source.y - snapOrigin.y) <= tolerance) {
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
