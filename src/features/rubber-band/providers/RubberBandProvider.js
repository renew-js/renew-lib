import { Provider } from '../../../core/Provider';


export class RubberBandProvider extends Provider {

    constructor () {
        super();
        this.rect = { x: 0, y: 0, width: 0, height: 0 };
    }

}
