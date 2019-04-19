export class ResizeProvider {

    constructor () {
        this.position = { x: 0, y: 0 };
    }

    init (x, y) {
        this.position.x = x;
        this.position.y = y;
    }

    element (element) {
        return {
            dimension: (x, y, width, height) => {
                element.x = x;
                element.y = y;
                element.width = width;
                element.height = height;
            },
        };
    }

}
