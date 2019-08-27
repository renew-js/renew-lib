import { Provider } from '../../../core/Provider';


export class MarkerProvider extends Provider {

    constructor () {
        super();
        this.markers = [];
        this.marked = [];
    }

    setMarker (element, marker) {
        this._setMarker(element, marker);
        this.marked.push(element);

        if (this.markers.indexOf(marker) === -1) {
            this.markers.push(marker);
        }
    }

    clear () {
        this.marked.forEach((element) => this._setMarker(element));
        this.markers = [];
    }

    _setMarker (element, name) {
        this.markers.forEach((marker) => {
            if (name === marker) {
                this.canvas.addMarker(element, marker);
            } else {
                this.canvas.removeMarker(element, marker);
                this.marked = this.marked.filter((marked) => {
                    return marked !== element;
                });
            }
        });
    }

}
