import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';

export class BaseShapesRules extends RuleProvider {
    constructor (eventBus) {
        super(eventBus);
    }

    init () {
        this.addRule('shape.resize', (context) => {
            // TODO: implement canResize(shape)
            // const shape = context.shape;
            // const newBounds = context.newBounds;
            // return canResize(shape, newBounds);
            return true;
        });

        this.addRule('shape.create', (context) => {
            const target = context.target;
            const shape = context.shape;

            return target.parent === shape.target;
        });

        this.addRule('connection.create', (context) => {
            const source = context.source;
            const target = context.target;

            return source.parent === target.parent;
        });
    }
}
