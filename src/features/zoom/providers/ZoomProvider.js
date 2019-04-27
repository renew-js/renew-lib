export class ZoomProvider {

    constructor (canvas) {
        this.canvas = canvas;
    }

    in (gap = 0.1) {
        this.canvas.zoom(this.canvas.getCurrentScale() + gap);
    }

    out (gap = 0.1) {
        this.canvas.zoom(this.canvas.getCurrentScale() - gap);
    }

}
