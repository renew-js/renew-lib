import Selection from 'diagram-js/lib/features/selection/Selection';


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

}
