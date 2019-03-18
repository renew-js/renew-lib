import { AbsoluteOrientation } from './AbsoluteOrientation';
import { CenterOrientation } from './CenterOrientation';
import { RelativeOrientation } from './RelativeOrientation';
import { RadialOrientation } from './RadialOrientation';
import { CardinalOrientation } from './CardinalOrientation';
import { FigureOrientation } from './FigureOrientation';


export class OrientationFactory {

    position (owner, orientation) {
        const Orientation = this.orientation(orientation.position);

        if (!Orientation) {
            throw new Error(`Orientation ${orientation.position} not defined`);
        }

        return new Orientation(owner, orientation).position();
    }

    orientation (type) {
        switch (type) {
            case 'center':
                return CenterOrientation;
            case 'relative':
                return RelativeOrientation;
            case 'point':
            case 'absolute':
                return AbsoluteOrientation;
            case 'radial':
                return RadialOrientation;
            case 'cardinal':
                return CardinalOrientation;
            case 'figure':
                return FigureOrientation;
            default:
                return null;
        }
    }

}
