import cloneDeep from 'lodash/cloneDeep';

import { Behavior } from '../../../core/eventBus/Behavior';


export class KeypressBehavior extends Behavior {

    constructor (eventBus, selection) {
        super();
        this.eventBus = eventBus;
        this.selection = selection;
    }

    after (event) {
        switch (event.originalEvent.key) {
            case 'Delete':
            case 'Backspace':
                if (!this.selection.count()) return;
                this.eventBus.fire('remove.elements', {
                    elements: cloneDeep(this.selection.getAll()),
                });
                break;
            default:
                return;
        }

        event.originalEvent.preventDefault();
    }

}
