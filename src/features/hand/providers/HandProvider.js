export class HandProvider {

    constructor (canvas) {
        this.canvas = canvas;
    }

    moveTo (x, y) {
        const bbox = this.canvas.viewbox();
        this.moveBy(x - (-bbox.x), y - (-bbox.y));
    }

    moveBy (dx, dy) {
        this.canvas.scroll({ dx: dx, dy: dy });
    }

}
