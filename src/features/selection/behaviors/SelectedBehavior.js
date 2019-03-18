import { Behavior } from '../../../core/eventBus/Behavior';


export class SelectedBehavior extends Behavior {

    constructor (selection, canvas) {
        super();
        this.selection = selection;
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
