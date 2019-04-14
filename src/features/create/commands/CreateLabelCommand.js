import { Command } from '../../../core/command/Command';


export class CreateLabelCommand extends Command {

    constructor (policy, canvas) {
        super();
        this.policy = policy;
        this.canvas = canvas;
    }

    canExecute (context) {
        return this.policy.allowed('create.label', context);
    }

    execute (context) {
        return this.canvas.addShape(context.label);
    }

    revert (context) {
    }

}
