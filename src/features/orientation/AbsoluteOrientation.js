import { Orientation } from './Orientation';


export class AbsoluteOrientation extends Orientation {

    constructor (owner, orientation) {
        super(owner);
        this.point = orientation;
    }

    position () {
        return {
            x: this.owner.x + this.point.x,
            y: this.owner.y + this.point.y,
        };
    }

}
