import { Behavior } from '../../../core/eventBus/Behavior';


export class HandlesHideBehavior extends Behavior {

    constructor (handle) {
        super();
        this.handle = handle;
    }

    during (event) {
        event.handles.forEach((handle) => {
            this.handle.hide(handle);
        });
    }

}
