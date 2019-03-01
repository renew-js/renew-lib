import BaseModeling from 'diagram-js/lib/features/modeling/Modeling';

export class MetaModeling extends BaseModeling {
    constructor (eventBus, elementFactory, commandStack) {
        super(eventBus, elementFactory, commandStack);
    }

    getHandlers () {
        return super.getHandlers();
    }
}
