export class CreateProvider {

    constructor () {
        this.factory = null;
        this.config = null;
    }

    createElement () {
        return this.factory.createElement(this.config.type);
    }

}
