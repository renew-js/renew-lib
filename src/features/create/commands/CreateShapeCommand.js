import { Command } from '../../../core/command/Command';


export class CreateShapeCommand extends Command {

    constructor (create, canvas, rulePolicy) {
        super();
        this.create = create;
        this.canvas = canvas;
        this.rulePolicy = rulePolicy;

        this.state = {};
    }

    canExecute (context) {
        return this.rulePolicy.allowed('create.shape', context);
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
        return this.canvas.addShape(this.state.shape);
    }

    revert (context) {
        this.canvas.removeShape(this.state.shape);
    }

}
