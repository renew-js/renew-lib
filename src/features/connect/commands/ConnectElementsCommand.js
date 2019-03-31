import { Command } from '../../../core/command/Command';


export class ConnectElementsCommand extends Command {

    constructor (canvas, layouter) {
        super();
        this.canvas = canvas;
        this.layouter = layouter;
    }

    execute (context) {
        if (!context.hoverStart.x || !context.hoverStart.y) {
            context.connection.source = {
                x: context.sx,
                y: context.sy,
            };
        } else {
            context.connection.source = context.hoverStart;
        }

        if (!context.hover.x || !context.hover.y) {
            context.connection.target = {
                x: context.x,
                y: context.y,
            };
        } else {
            context.connection.target = context.hover;
        }


        context.connection.waypoints = this.layouter.layoutConnection(
            context.connection
        );

        console.log(context.connection);
        this.canvas.addConnection(context.connection);

        return context.connection;
    }

    revert (context) {

    }

}
