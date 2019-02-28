import { Orientation } from './Orientation';


export class CardinalOrientation extends Orientation {

    constructor (owner, orientation) {
        super(owner);
        this.direction = orientation.direction;
        if (typeof orientation.direction === "string") {
            this.direction = CardinalOrientation.parse(orientation.direction);
        }
    }

    position () {
        let dx = 0.5, dy = 0.5;

        if ((this.direction & CardinalOrientation.NORTH) > 0) {
            dy = 0;
        } else if ((this.direction & CardinalOrientation.SOUTH) > 0) {
            dy = 1;
        }

        if ((this.direction & CardinalOrientation.EAST) > 0) {
            dx = 1;
        } else if ((this.direction & CardinalOrientation.WEST) > 0) {
            dx = 0;
        }

        return {
            x: this.owner.x + dx * this.owner.width,
            y: this.owner.y + dy * this.owner.height
        };
    }

    static parse (direction) {
        switch (direction) {
            case 'N':
            case 'north':
                return CardinalOrientation.NORTH;
            case 'NE':
            case 'northeast':
                return CardinalOrientation.NORTH_EAST;
            case 'E':
            case 'east':
                return CardinalOrientation.EAST;
            case 'SE':
            case 'southeast':
                return CardinalOrientation.SOUTH_EAST;
            case 'S':
            case 'south':
                return CardinalOrientation.SOUTH;
            case 'SW':
            case 'southwest':
                return CardinalOrientation.SOUTH_WEST;
            case 'W':
            case 'west':
                return CardinalOrientation.WEST;
            case 'NW':
            case 'northwest':
                return CardinalOrientation.NORTH_WEST;
        }
    }

    static get NORTH () {
        return 1;
    }

    static get NORTH_EAST () {
        return this.NORTH | this.EAST;
    }

    static get EAST () {
        return 2;
    }

    static get SOUTH_EAST () {
        return this.SOUTH | this.EAST;
    }

    static get SOUTH () {
        return 4;
    }

    static get SOUTH_WEST () {
        return this.SOUTH | this.WEST;
    }

    static get WEST () {
        return 8;
    }

    static get NORTH_WEST () {
        return this.NORTH | this.WEST;
    }

}
