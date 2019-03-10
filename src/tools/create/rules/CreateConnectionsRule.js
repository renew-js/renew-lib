import { Rule } from '../../../core/policy/Rule';


export class CreateConnectionsRule extends Rule {
    constructor () {
        super();
    }

    validate (context) {
        return true;
    }
}
