import { Command } from '../../../core/command/Command';


export class CreateLabelCommand extends Command {

    constructor (rulePolicy, canvas) {
        super();
        this.rulePolicy = rulePolicy;
        this.canvas = canvas;

        this.state = {};
    }

    canExecute (context) {
        return this.rulePolicy.allowed('create.label', context);
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
