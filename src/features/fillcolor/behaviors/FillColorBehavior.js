import { Behavior } from '../../../core/eventBus/Behavior';


export class FillColorBehavior extends Behavior {

    constructor (fillColor, selection) {
        super();
        this.fillColor = fillColor;
        this.selection = selection;
    }

    during (event,color) {
        this.fillColor.fillColor (color);
    }  

    after(event){}  

}
