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
        Object.assign(context.shape, {
            x: context.position.x,
            y: context.position.y,
        });
    }

    execute (context) {
        return this.canvas.addShape(context.shape);
    }

    revert (context) {
        this.canvas.removeShape(context.shape);
    }

    postExecute (context) {
    }

}
