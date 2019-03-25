import { Command } from '../../../core/command/Command';


export class RemoveElementsCommand extends Command {

    constructor (canvas) {
        super();
        this.canvas = canvas;
    }

    preExecute (context) {
        const multiple = Array.isArray(context.elements);
        context.elements = multiple ? context.elements : [ context.elements ];
    }

    execute (context) {
        context.elements.forEach((element) => {
            switch (element.type) {
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
        (element.incoming || []).forEach((connection) => {
            this._removeConnection(connection)
        });
        (element.outgoing || []).forEach((connection) => {
            this._removeConnection(connection)
        });
        this.canvas.removeShape(element);
    }

    _removeConnection (element) {
        element.source.incoming.splice(
            element.source.incoming.indexOf(element),
            1
        );
        element.source.outgoing.splice(
            element.source.outgoing.indexOf(element),
            1
        );
        element.target.incoming.splice(
            element.target.incoming.indexOf(element),
            1
        );
        element.target.outgoing.splice(
            element.target.outgoing.indexOf(element),
            1
        );

        this.canvas.removeConnection(element);
    }

    revert (context) {
        // TODO
    }

}
