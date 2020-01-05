export class ResizeProvider {

    constructor () {
        this.element = null;
        this.start = { x: 0, y: 0, width: 1, height: 1 };
    }

    init (element) {
        this.element = element;
        this.start.x = element.x;
        this.start.y = element.y;
        this.start.width = element.width;
        this.start.height = element.height;
    }

    updateDimension (x, y, width, height) {
        if (this.element) {
            this.element.x = x;
            this.element.y = y;
            this.element.width = width;
            this.element.height = height;
        }
    }

}
