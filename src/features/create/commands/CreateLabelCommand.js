import { Command } from '../../../core/command/Command';


export class CreateLabelCommand extends Command {

    constructor (policy, canvas) {
        super();
        this.policy = policy;
        this.canvas = canvas;

        this.state = {};
    }

    canExecute (context) {
        return this.policy.allowed('create.label', context);
    }

    preExecute (context) {
        this.state.label = context.label;
    }

    execute (context) {
        return this.canvas.addShape(this.state.label);
    }

    revert (context) {
        this.canvas.removeShape(this.state.label);
    }

}
