import { Orientation } from './Orientation';


export class CenterOrientation extends Orientation {

    constructor (owner) {
        super(owner);
    }

    position () {
        return {
            x: this.owner.x + 0.5 * this.owner.width,
            y: this.owner.y + 0.5 * this.owner.height,
        };
    }

}
