import { Rule } from '../../../core/policy/Rule';


export class CreateShapeRule extends Rule {

    validate (context) {
        console.log('validate', context.event.target);
        return true;
    }

}
