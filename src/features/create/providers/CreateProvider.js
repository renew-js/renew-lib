export class CreateProvider {

    constructor () {
        this.factory = null;
        this.config = null;
        this.element = null;
    }

    createElement (x, y) {
        this.element = this.factory.createElement(this.config.type);
        this.element.x = x;
        this.element.y = y;
        return this.element;
    }

}
