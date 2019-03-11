import { Rule } from '../../../core/policy/Rule';


export class ConnectStartRule extends Rule {

    constructor () {
        super();
    }

    validate (context) {
        return true;
    }

}
