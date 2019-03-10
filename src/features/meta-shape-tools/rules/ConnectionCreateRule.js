import { Rule } from '../../../core/policy/Rule';


export class ConnectionCreateRule extends Rule {
    constructor () {
        super();
    }

    validate (context) {
        return true;
    }
}
