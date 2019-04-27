import { Command } from '../../../core/command/Command';


export class RemoveElementsCommand extends Command {

    constructor (canvas) {
        super();
        this.canvas = canvas;

        this.state = { removed: [], unbind: [] };
    }

    preExecute (context) {
        const multiple = Array.isArray(context.elements);
        context.elements = multiple ? context.elements : [ context.elements ];
    }

    execute (context) {
        context.elements.forEach((element) => {
            switch (element.type) {
                case 'label':
                case 'shape':
                    this._removeShape(element);
                    break;
                case 'connection':
                    this._removeConnection(element);
                    break;
            }
        });
    }

    _removeShape (element) {
        this.state.removed.push(element);

        (element.incoming || []).forEach((connection) => {
            this._removeConnection(connection);
        });
        (element.outgoing || []).forEach((connection) => {
            this._removeConnection(connection);
        });

        this.canvas.removeShape(element);
    }

    _removeConnection (element) {
        this.state.removed.push(element);

        // TODO: Unbind incomming / outgoing

        this.canvas.removeConnection(element);
    }

    revert (context) {
        this.state.removed.forEach((element) => {
            switch (element.type) {
                case 'label':
                case 'shape':
                    this.canvas.addShape(element);
                    break;
                case 'connection':
                    this.canvas.addConnection(element);
                    break;
            }
        });
    }

}
