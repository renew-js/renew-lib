import { Provider } from '../../../core/Provider';


export class HandProvider extends Provider {

    moveTo (x, y) {
        const bbox = this.canvas.viewbox();
        this.moveBy(x - (-bbox.x), y - (-bbox.y));
    }

    moveBy (dx, dy) {
        this.canvas.scroll({ dx: dx, dy: dy });
    }

}
