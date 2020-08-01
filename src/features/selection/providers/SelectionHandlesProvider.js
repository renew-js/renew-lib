export class SelectionHandlesProvider {

    constructor (eventBus, handle, orientation) {
        this.eventBus = eventBus;
        this.handle = handle;
        this.orientation = orientation;
        this.handles = [];
    }

    create (bbox) {
        const CardinalOrientation = this.orientation.orientation('cardinal');

        const style = {
            metaObject: {
                representation: {
                    name: 'rect',
                    type: 'element',
                    attributes: {
                        x: 1,
                        y: 1,
                        width: 6,
                        height: 6,
                        style: 'fill:#fff;stroke:#ddd;stroke-width:2px;',
                    },
                    children: [],
                },
            },
        };
        this.handles = [
            this.handle.create(
                new CardinalOrientation(bbox, 'northwest'),
                style
            ),
            this.handle.create(
                new CardinalOrientation(bbox, 'northeast'),
                style
            ),
            this.handle.create(
                new CardinalOrientation(bbox, 'southeast'),
                style
            ),
            this.handle.create(
                new CardinalOrientation(bbox, 'southwest'),
                style
            ),

            this.handle.create(
                new CardinalOrientation(bbox, 'north'),
                style
            ),

            this.handle.create(
                new CardinalOrientation(bbox, 'east'),
                style
            ),

            this.handle.create(
                new CardinalOrientation(bbox, 'south'),
                style
            ),

            this.handle.create(
                new CardinalOrientation(bbox, 'west'),
                style
            ),
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
