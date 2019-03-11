import { Rule } from '../../../core/policy/Rule';


export class ConnectEndRule extends Rule {

    constructor () {
        super();
    }

    validate (context) {
        return true;
    }

}
