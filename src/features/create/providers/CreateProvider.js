import { DefaultFactory } from '../util/DefaultFactory';


export class CreateProvider {

    constructor () {
        this.factory = new DefaultFactory();
    }

    element (x, y) {
        let shape = this.factory.create();
        shape.x = x;
        shape.y = y;
        shape.width = shape.width || 1;
        shape.height = shape.height || 1;
        return shape;
    }

    resetFactory () {
        this.factory = new DefaultFactory();
    }

}
