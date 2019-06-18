import { Rule } from '../../../core/policy/Rule';


export class ResizeElementRule extends Rule {

    constructor () {
        super();
    }

    validate (context) {
        return context.element.type === 'shape';
    }

}
