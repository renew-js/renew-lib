import { Command } from '../../../../../src/core/command/Command';


export class TestCommand extends Command {

    constructor (test) {
        super();
        this.test = test;
    }

    execute (context) {
        this.test.count += 1;
    }

    revert (context) {
        this.test.count -= 1;
    }

}
