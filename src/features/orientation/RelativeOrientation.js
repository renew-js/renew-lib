import { Orientation } from "./Orientation";


export class RelativeOrientation extends Orientation {

    constructor (owner, orientation) {
        super(owner);
        this.dx = orientation.dx;
        this.dy = orientation.dy;
    }

    position () {
        return {
            x: this.owner.x + this.dx * this.owner.width,
            y: this.owner.y + this.dy * this.owner.height
        };
    }

}
