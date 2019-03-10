import { Command } from '../../../core/command/Command';


export class CreateShapeCommand extends Command {
    constructor (canvas, policy) {
        super();
        this.canvas = canvas;
        this.policy = policy;
    }

    canExecute (context) {
        return this.policy.allowed('shape.create', context);
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
        return this.canvas.addShape(context.shape);
    }

    revert (context) {
        // (3) remove from canvas
        this.canvas.removeShape(context.shape);
    }

    postExecute (context) {
    }

}
