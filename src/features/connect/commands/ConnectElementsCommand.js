import { Command } from '../../../core/command/Command';


export class ConnectElementsCommand extends Command {

    constructor (canvas, layouter) {
        super();
        this.canvas = canvas;
        this.layouter = layouter;
    }

    execute (context) {
        context.connection.waypoints = this.layouter.layoutConnection(
            context.connection
        );

        this.canvas.addConnection(context.connection);

        return context.connection;
    }

    revert (context) {

    }

}
