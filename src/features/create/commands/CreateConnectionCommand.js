import { Command } from '../../../core/command/Command';


export class CreateConnectionCommand extends Command {

    constructor (canvas, layouter) {
        super();
        this.canvas = canvas;
        this.layouter = layouter;

        this.state = {};
    }

    preExecute (context) {
        context.connection.waypoints = this.layouter.layoutConnection(
            context.connection
        );

        this.state.connection = context.connection;
    }

    execute (context) {
        this.canvas.addConnection(this.state.connection);
        return this.state.connection;
    }

    revert (context) {
        this.canvas.removeConnection(this.state.connection);
    }

}
