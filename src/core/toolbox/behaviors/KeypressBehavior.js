import { Behavior } from '../../eventBus/Behavior';


export class KeypressBehavior extends Behavior {

    constructor (toolbox) {
        super();
        this.toolbox = toolbox;
    }

    after (event) {
        switch (event.originalEvent.key) {
            case 'Esc': // IE/Edge specific value
            case 'Escape':
                this.toolbox.activateDefault();
                break;
            default:
                return;
        }

        event.originalEvent.preventDefault();
    }

}
