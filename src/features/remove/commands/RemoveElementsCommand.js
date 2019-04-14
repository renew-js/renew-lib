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
        (element.incoming || []).forEach((connection) => {
            this._removeConnection(connection);
        });
        (element.outgoing || []).forEach((connection) => {
            this._removeConnection(connection);
        });
        this.canvas.removeShape(element);
    }

    _removeConnection (element) {
        const source = element.source || null;
        const target = element.target || null;

        if (source) {
            if (source.incoming) {
                source.incoming.splice(source.incoming.indexOf(element), 1);
            }

            if (source.outgoing) {
                source.outgoing.splice(source.outgoing.indexOf(element), 1);
            }
        }

        if (target) {
            if (target.incoming) {
                target.incoming.splice(target.incoming.indexOf(element), 1);
            }

            if (target.outgoing) {
                target.outgoing.splice(target.outgoing.indexOf(element), 1);
            }
        }

        this.canvas.removeConnection(element);
    }

    revert (context) {
        // TODO
    }

}
