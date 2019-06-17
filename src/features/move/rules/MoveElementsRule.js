import { Rule } from '../../../core/policy/Rule';


export class MoveElementsRule extends Rule {

    constructor () {
        super();
    }

    validate (context) {
        return true;
    }

}
