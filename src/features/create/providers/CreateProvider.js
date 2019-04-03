export class CreateProvider {

    constructor (factory) {
        this.factory = factory;
    }

    shape (x, y) {
        return this.factory.createShape({ x: x, y: y });
    }

}
