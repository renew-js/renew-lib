export class FactoryProvider {

    constructor (defaultFactory) {
        this.defaultFactory = defaultFactory;
        this.factory = defaultFactory;
    }

    set (factory) {
        if (!factory.createShape
            || !factory.createConnection
            || !factory.createLabel
        ) {
            throw new Error('Factory methods should be defined');
        }

        this.factory = factory;
    }

    reset () {
        this.factory = this.defaultFactory;
    }

    createShape (attributes) {
        return this.factory.createShape(attributes);
    }

    createConnection (attributes) {
        return this.factory.createConnection(attributes);
    }

    createLabel (attributes) {
        return this.factory.createLabel(attributes);
    }

}
