export class CreateProvider {

    constructor () {
        this.factory = null;
        this.config = null;
        this.element = null;
    }

    createElement () {
        return this.element = this.factory.createElement(this.config.type);
    }

}
