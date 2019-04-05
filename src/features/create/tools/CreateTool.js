import { Tool } from '../../../core/toolbox/Tool';


export class CreateTool extends Tool {

    constructor (eventBus) {
        super();
        this.eventBus = eventBus;
    }

    onDisable (event) {
        this.eventBus.fire('factory.reset', event);
        this.eventBus.fire('cursor.unset', event);
        this.eventBus.fire('marker.clear', event);
    }

    onEnable (event) {
        this.eventBus.fire('factory.set', event);
    }

    onMouseDown (event) {
        if (event.hover) {
            this.isCreating = true;
            this.onCreateDown(event);
        }
    }

    /**
     * @abstract
     * @param {object} event
     */
    onCreateDown (event) { }

    onMouseMove (event) {
        if (this.isCreating) {
            this.onCreateMove(event);
        }
        /*
        if (!event.hover) {
            this.clear();
        } else if (this.policy.allowed('create.shape', { })) {
            this._setMarker(event.hover, 'new-parent');
            this.marked.push(event.hover);
        } else {
            this._setMarker(event.hover, 'drop-not-ok');
            this.marked.push(event.hover);
        }
        */
    }

    /**
     * @abstract
     * @param {object} event
     */
    onCreateMove (event) { }

    onMouseUp (event) {
        if (this.isCreating) {
            this.onCreateUp(event);
            this.isCreating = false;
        }

        this.eventBus.fire('marker.clear', event);

        if (!event.originalEvent.shiftKey) {
            this.eventBus.fire('toolbox.activate', { tool: 'pointer' });
        }
    }

    /**
     * @abstract
     * @param {object} event
     */
    onCreateUp (event) { }

    onOut (event) {
        this.eventBus.fire('marker.clear', event);
    }

}
