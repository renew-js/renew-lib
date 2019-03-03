import BaseModeling from 'diagram-js/lib/features/modeling/Modeling';

export class MetaModeling extends BaseModeling {

    constructor (eventBus, elementFactory, commandStack) {
        super(eventBus, elementFactory, commandStack);

        eventBus.on('elements.remove.start', (event) => {
            this.removeElements(event.elements);
        });
    }

    getHandlers () {
        return super.getHandlers();
    }

}
