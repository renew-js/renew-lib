import Modeling from 'diagram-js/lib/features/modeling/Modeling';

export class MetaModeling extends Modeling {
    constructor (eventBus, elementFactory, commandStack) {
        super(eventBus, elementFactory, commandStack);
    }

    getHandlers () {
        return [];
    }
}
