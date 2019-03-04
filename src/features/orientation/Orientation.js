/**
 * @abstract
 */
export class Orientation {

    constructor (owner) {
        this.owner = owner;
        this.point = { x: 0, y: 0 };
    }

    /**
     * @abstract
     * @return {Object} point { x: Number, y: Number }
     */
    position () {
        return this.point;
    }

}
