import { Orientation } from './Orientation';


export class FigureOrientation extends Orientation {

    constructor (owner) {
        super(owner);
    }

    position () {
        return {
            x: this.owner.x,
            y: this.owner.y,
            width: this.owner.width,
            height: this.owner.height
        };
    }

}
