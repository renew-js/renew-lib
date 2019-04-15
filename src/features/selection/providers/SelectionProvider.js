import Selection from 'diagram-js/lib/features/selection/Selection';
import { getBBox } from 'diagram-js/lib/util/Elements';


export class SelectionProvider extends Selection {

    constructor (eventBus) {
        super(eventBus);
    }

    clear () {
        this.select(null);
        this._selectedElements = [];
    }

    empty () {
        return !this.count();
    }

    count () {
        return this._selectedElements.length;
    }

    add (elements) {
        this.select(elements, true);
    }

    remove (elements) {
        elements = Array.isArray(elements) ? elements : [ elements ];
        elements.forEach((element) => {
            this.deselect(element);
        });
    }

    getBBox (elements) {
        return getBBox(this.get());
    }

}
