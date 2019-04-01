export class CreateProvider {

    constructor (defaultFactory) {
        this.defaultFactory = defaultFactory;
        this.factory = defaultFactory;
    }

    element (x, y) {
        const shape = this.factory.createShape();
        shape.x = x;
        shape.y = y;
        shape.width = shape.width || 1;
        shape.height = shape.height || 1;
        return shape;
    }

    resetFactory () {
        this.factory = this.defaultFactory;
    }

}
