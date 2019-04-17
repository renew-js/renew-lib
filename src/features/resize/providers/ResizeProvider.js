export class ResizeProvider {

    constructor () {

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
