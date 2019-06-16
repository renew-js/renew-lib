import { Rule } from '../../../core/policy/Rule';


export class ConnectTargetRule extends Rule {

    constructor () {
        super();
    }

    validate (context) {
        return true;
    }

}
