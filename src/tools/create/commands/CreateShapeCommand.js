import { Command } from '../../../core/Command';


export class CreateShapeCommand extends Command {
    constructor (canvas) {
        super();
        this.canvas = canvas;
    }

    preExecute (context) {
        // (1) add at event center position _or_ at given bounds
        Object.assign(context.shape, {
            x: context.position.x - Math.round(context.shape.width / 2),
            y: context.position.y - Math.round(context.shape.height / 2)
        });
    }

    execute (context) {
        // (2) add to canvas
        const shape = this.canvas.addShape(context.shape, context.parent, context.index);
        console.log(shape);

        return context.shape;
    }

    revert (context) {
        this.canvas.removeShape(context.shape);
    }

    postExecute (context) {
    }

}
