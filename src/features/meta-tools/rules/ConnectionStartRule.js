import { Rule } from '../../../core/policy/Rule';


export class ConnectionStartRule extends Rule {

    constructor () {
        super();
    }


    validate (context) {
        return true;
    }

}
