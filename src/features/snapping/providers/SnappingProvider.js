import Snapping from 'diagram-js/lib/features/snapping/Snapping';
import { mid } from 'diagram-js/lib/features/snapping/SnapUtil';


export class SnappingProvider extends Snapping {

    constructor (eventBus, canvas) {
        super(eventBus, canvas);
        this.canvas = canvas;
        this.points = [ ];
        this.snapOrigin = { };

        this._asyncHide = () => {};
    }

    init (target) {
        target = !target ? this.canvas.getRootElement() : target;

        this.points = [ ];

        target.children.forEach(child => this.points.push(mid(child)));
    }

    snap (source, tolerance = 7) {
        const snapped = { };

        this.hide();

        this.points.forEach((point) => {
            if (Math.abs(point.x - source.x - this.snapOrigin.x) <= tolerance) {
                snapped.x = point.x - this.snapOrigin.x;
                this.showSnapLine('vertical', point.x);
            } else if (Math.abs(point.y - source.y - this.snapOrigin.y) <= tolerance) {
                snapped.y = point.y - this.snapOrigin.y;
                this.showSnapLine('horizontal', point.y);
            }
        });

        return snapped;
    }

    stop () {
        this.points = [ ];
        this.hide();
    }

}
