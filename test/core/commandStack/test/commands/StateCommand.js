import { Command } from '../../../../../src/core/command/Command';


export class StateCommand extends Command {

    constructor (test) {
        super();
        this.test = test;
        this.state = 0;
    }

    execute (context) {
        this.state = this.test.count;
        this.test.count = context.count;
    }

    revert (context) {
        this.test.count = this.state;
    }

}
