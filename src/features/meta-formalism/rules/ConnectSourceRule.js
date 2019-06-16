import { Rule } from '../../../core/policy/Rule';


export class ConnectSourceRule extends Rule {

    constructor () {
        super();
    }


    validate (context) {
        console.log('connect element rule', context);
        return true;
    }

}
