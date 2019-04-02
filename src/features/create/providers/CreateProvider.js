export class CreateProvider {

    constructor (factory) {
        this.factory = factory;
    }

    element (x, y) {
        return this.factory.createShape({ x: x, y: y });
    }

}
