import { MoveElementsCommand } from './MoveElementsCommand';


export class MoveToCommand extends MoveElementsCommand {

    constructor (eventBus, canvas, layouter) {
        super(eventBus, canvas, layouter);
    }

    preExecute (context) {
        if (this.moves.length === 0) {
            (context.elements || [ context.element ]).forEach((element) => {
                const dx = (context.x - element.x);
                const dy = (context.y - element.y);

                this.moves.push({ element, dx, dy });
            });
        }
    }

}
