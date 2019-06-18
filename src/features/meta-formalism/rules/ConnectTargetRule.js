import { Rule } from '../../../core/policy/Rule';


export class ConnectTargetRule extends Rule {

    constructor () {
        super();
    }


    validate (context) {
        const originTypes = [ '*' ];
        const targetTypes = [ '*' ];

        if (context.hoverStart && context.hoverStart.metaObject) {
            originTypes.push(context.hoverStart.metaObject.targetType);
        }
        if (context.hover && context.hover.metaObject) {
            targetTypes.push(context.hover.metaObject.targetType);
        }

        return originTypes.some((sourceType) => {
            return context.metaObject.bind[sourceType]
                && context.metaObject.bind[sourceType].some((targetType) => {
                    return targetTypes.includes(targetType);
                });
        });
    }

}
