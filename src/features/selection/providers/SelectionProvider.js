import Selection from 'diagram-js/lib/features/selection/Selection';


export class SelectionProvider extends Selection {

    constructor (eventBus) {
        super(eventBus);
    }

    clear () {
        this.select(null);
    }

}
