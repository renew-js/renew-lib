export class MoveProvider {

    constructor (commandStack) {
        this.commandStack = commandStack;
    }

    elements (shapes) {
        shapes = Array.isArray(shapes) ? shapes : [ shapes ];
        return {
            to: (x, y) => {
                this.commandStack.execute('move.elements', {
                    elements: shapes,
                    x: x,
                    y: y,
                });
            },
            by: (tx, ty) => {
                this.commandStack.execute('move.elements', {
                    elements: shapes,
                    dx: tx,
                    dy: ty,
                });
            }
        }
    }

}
