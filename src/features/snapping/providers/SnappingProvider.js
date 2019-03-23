import Snapping from 'diagram-js/lib/features/snapping/Snapping';
import { mid } from 'diagram-js/lib/features/snapping/SnapUtil';


export class SnappingProvider extends Snapping {

    constructor (eventBus, canvas) {
        super(eventBus, canvas);
        this.canvas = canvas;
        this.points = [ ];

        this._asyncHide = () => {};
    }

    init (target) {
        target = !target ? this.canvas.getRootElement() : target;

        this.points = [ ];

        target.children.forEach(child => this.points.push(mid(child)));
    }

    snap (source) {
        const snapped = { };

        this.hide();

        this.points.forEach((point) => {
            if (point.x - 5 <= source.x && point.x + 5 >= source.x) {
                snapped.x = point.x;
                this.showSnapLine('vertical', point.x);
            } else if (point.y - 5 <= source.y && point.y + 5 >= source.y) {
                snapped.y = point.y;
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
