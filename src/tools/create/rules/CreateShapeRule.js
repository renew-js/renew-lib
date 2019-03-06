import { Rule } from '../../../core/policy/Rule';


export class CreateShapeRule extends Rule {

    validate (context) {
        return !!(context.parent || context.hover);
    }

}
