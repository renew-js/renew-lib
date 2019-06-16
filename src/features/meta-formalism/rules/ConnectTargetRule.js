import { Rule } from '../../../core/policy/Rule';


export class ConnectTargetRule extends Rule {

    constructor () {
        super();
    }


    validate (context) {
        console.log('connect element rule', context);
        return true;
    }

}
