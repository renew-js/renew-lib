import { Rule } from '../../../core/policy/Rule';


export class MoveElementRule extends Rule {

    constructor () {
        super();
    }

    validate (context) {
        // TODO: find a better rule
        return context.element.id !== '__implicitroot';
    }
}
