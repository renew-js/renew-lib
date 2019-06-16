import { Rule } from '../../../core/policy/Rule';


export class ConnectSourceRule extends Rule {

    constructor () {
        super();
    }


    validate (context) {
        const allowedTypes = [ '*' ];
        if (context.hover && context.hover.metaObject) {
            allowedTypes.push(context.hover.metaObject.targetType);
        }
        return Object.keys(context.metaObject.bind).some((type) => {
            return allowedTypes.includes(type);
        });
    }

}
