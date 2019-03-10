import { Rule } from '../../../core/policy/Rule';


export class ShapePreviewRule extends Rule {

    constructor (create) {
        super();
        this.create = create;
    }

    validate (context) {
        return this.onCanvas(context) && this.isShape();
    }

    onCanvas (context) {
        return !!(context.parent || context.hover);
    }

    isShape () {
        return this.create.factory.getType(this.create.config.type) === 'Shape';
    }

}
