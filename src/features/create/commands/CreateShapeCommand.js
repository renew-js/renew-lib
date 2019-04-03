import { Command } from '../../../core/command/Command';


export class CreateShapeCommand extends Command {

    constructor (create, canvas, policy) {
        super();
        this.create = create;
        this.canvas = canvas;
        this.policy = policy;

        this.state = {};
    }

    canExecute (context) {
        return this.policy.allowed('create.shape', context);
    }

    preExecute (context) {
        if (!context.shape) {
            context.shape = this.create.shape();
        }
        this.state.shape = context.shape;
        this.state.shape.x = context.x || this.state.shape.x;
        this.state.shape.y = context.y || this.state.shape.y;
    }

    execute (context) {
        return this.canvas._addElement(this.state.shape.type, this.state.shape);
    }

    revert (context) {
        this.canvas.removeShape(this.state.shape);
    }

    postExecute (context) {
    }

}
