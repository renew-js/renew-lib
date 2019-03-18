import { Orientation } from './Orientation';


export class RadialOrientation extends Orientation {

    constructor (owner, orientation) {
        super(owner);
        this.degree = orientation.degree;
        if (!orientation.degree && orientation.direction) {
            this.degree = RadialOrientation.parse(orientation.degree);
        }
        this.radians = orientation.degree * Math.PI / 180;
    }

    position () {
        const center = {
            x: this.owner.x + 0.5 * this.owner.width,
            y: this.owner.y + 0.5 * this.owner.height,
        };
        return {
            x: center.x + this.owner.width / 2 * Math.cos(this.radians),
            y: center.y + this.owner.height / 2 * Math.sin(this.radians),
        };
    }

    static parse (direction) {
        switch (direction) {
            case 'N':
            case 'north':
                return RadialOrientation.NORTH;
            case 'NE':
            case 'northeast':
                return RadialOrientation.NORTH_EAST;
            case 'E':
            case 'east':
                return RadialOrientation.EAST;
            case 'SE':
            case 'southeast':
                return RadialOrientation.SOUTH_EAST;
            case 'S':
            case 'south':
                return RadialOrientation.SOUTH;
            case 'SW':
            case 'southwest':
                return RadialOrientation.SOUTH_WEST;
            case 'W':
            case 'west':
                return RadialOrientation.WEST;
            case 'NW':
            case 'northwest':
                return RadialOrientation.NORTH_WEST;
        }
    }

    static get NORTH () {
        return 90;
    }

    static get NORTH_EAST () {
        return 45;
    }

    static get EAST () {
        return 0;
    }

    static get SOUTH_EAST () {
        return 315;
    }

    static get SOUTH () {
        return 270;
    }

    static get SOUTH_WEST () {
        return 225;
    }

    static get WEST () {
        return 180;
    }

    static get NORTH_WEST () {
        return 135;
    }

}
