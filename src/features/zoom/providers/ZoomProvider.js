import { Provider } from '../../../core/Provider';


export class ZoomProvider extends Provider {

    in (gap = 0.1) {
        this.canvas.zoom(this.canvas.getCurrentScale() + gap);
    }

    out (gap = 0.1) {
        this.canvas.zoom(this.canvas.getCurrentScale() - gap);
    }

}
