import Selection from 'diagram-js/lib/features/selection/Selection';


export class SelectionProvider extends Selection {

    constructor (eventBus) {
        super(eventBus);
    }

    clear () {
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

}
