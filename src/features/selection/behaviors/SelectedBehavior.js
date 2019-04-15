import { Behavior } from '../../../core/eventBus/Behavior';


export class SelectedBehavior extends Behavior {

    constructor (canvas) {
        super();
        this.canvas = canvas;
    }

    before (event) {
        event.oldSelection.forEach((element) => {
            if (event.newSelection.indexOf(element) === -1) {
                this.canvas.removeMarker(element, 'selected');
            }
        });
    }

    during (event) {
        event.newSelection.forEach((element) => {
            if (event.oldSelection.indexOf(element) === -1) {
                this.canvas.addMarker(element, 'selected');
            }
        });
    }

}
