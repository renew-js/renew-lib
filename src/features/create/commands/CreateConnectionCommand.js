import { Command } from '../../../core/command/Command';


export class CreateConnectionCommand extends Command {

    constructor (canvas, layouter) {
        super();
        this.canvas = canvas;
        this.layouter = layouter;
    }

    preExecute (context) {
        context.connection.waypoints = this.layouter.layoutConnection(
            context.connection
        );
    }

    execute (context) {
        this.canvas.addConnection(context.connection);
        return context.connection;
    }

    revert (context) {

    }

}
