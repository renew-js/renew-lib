import Snapping from 'diagram-js/lib/features/snapping/Snapping';
import { mid } from 'diagram-js/lib/features/snapping/SnapUtil';


export class SnappingProvider extends Snapping {

    constructor (eventBus, canvas) {
        super(eventBus, canvas);
        this.canvas = canvas;
        this.points = [ ];
    }

    init (target) {
        target = !target ? this.canvas.getRootElement() : target;

        target.children.forEach(child => this.points.push(mid(child)));
    }

    snap (source) {
        const snapped = { };

        // console.log(source, this.points);

        this.points.forEach((point) => {
            if (point.x - 2 <= source.x && point.x + 2 >= source.x) {
                snapped.x = point.x;
                this.showSnapLine('vertical', point.x);
            }
            if (point.y - 2 <= source.y && point.y + 2 >= source.y) {
                snapped.y = point.y;
                this.showSnapLine('horizontal', point.y);
            }
        });

        return snapped;
    }

}
