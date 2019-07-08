import { MoveElementsCommand } from './MoveElementsCommand';


export class MoveByCommand extends MoveElementsCommand {

    constructor (eventBus, canvas, layouter) {
        super(eventBus, canvas, layouter);
    }

    preExecute (context) {
        if (this.moves.length === 0) {
            (context.elements || [ context.element ]).forEach((element) => {
                const dx = context.dx;
                const dy = context.dy;

                this.moves.push({ element, dx, dy });
            });
        }
    }

}
