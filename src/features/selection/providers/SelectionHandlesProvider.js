export class SelectionHandlesProvider {

    constructor (eventBus, handle, orientation) {
        this.eventBus = eventBus;
        this.handle = handle;
        this.orientation = orientation;
        this.handles = [];
    }

    create (bbox) {
        const CardinalOrientation = this.orientation.orientation('cardinal');
        this.handles = [
            this.handle.create(new CardinalOrientation(bbox, 'northwest')),
            this.handle.create(new CardinalOrientation(bbox, 'northeast')),
            this.handle.create(new CardinalOrientation(bbox, 'southeast')),
            this.handle.create(new CardinalOrientation(bbox, 'southwest')),
        ];
    }

    show () {
        this.eventBus.fire('handles.show', {
            handles: this.handles,
        });
    }

    hide () {
        this.eventBus.fire('handles.hide', {
            handles: this.handles,
        });
    }

}
