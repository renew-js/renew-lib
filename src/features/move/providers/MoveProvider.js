export class MoveProvider {

    constructor (commandStack) {
        this.commandStack = commandStack;
    }

    elements (shapes) {
        if (!shapes) {
            throw new Error('No shapes to move');
        }

        shapes = Array.isArray(shapes) ? shapes : [ shapes ];
        return {
            to: (x, y) => {
                this.commandStack.execute('move.to', {
                    elements: shapes,
                    x: x,
                    y: y,
                });
            },
            by: (dx, dy) => {
                this.commandStack.execute('move.by', {
                    elements: shapes,
                    dx: dx,
                    dy: dy,
                });
            },
        };
    }

}
