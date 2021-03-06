import { Command } from '../../../core/command/Command';


export class FontSizeCommand extends Command {

    constructor (commandStack, canvas, selection ) {
        super();
        this.canvas = canvas;
        this.selection = selection;
        this.commandStack = commandStack;
        this.state = { removed: [], unbind: [] };
        this.attribute = { attributeHistory: [], unbind: [] };
    }

    preExecute (attribute) {
        this.attribute.attributeHistory.push(attribute);
        this.selectedShapes = [ ...this.selection.get() ];
        this.selectedShapes.forEach((shape) => {
            if (shape.type==='label') {
                const element = shape;
                const oldAttribute = element.options.
                    style['font-size'];
                this.state.removed.push([ shape, oldAttribute ]);
            }
        });

    }

    execute (attribute) {
        const newShapes = [];
        this.state.removed.forEach((shape) => {
            if (shape[0].type==='label') {
                const element = shape[0];
                element.options.style['font-size'] = attribute;
                const newShape = element;
                this.canvas.removeShape(shape[0]);
                this.canvas.addShape(newShape);
                newShapes.push(newShape);
            }
        });
        this.selection.add(newShapes);
    }


    revert (context) {
        this.state.removed.forEach((element) => {
            this.canvas.removeShape(element[0]);
        });
        this.state.removed.forEach((obj, index) => {
            const element = obj[0];
            element.options.style['font-size'] = obj[1];
            const newShape = element;
            this.canvas.addShape(newShape);
            delete this.state.removed[index];
            this.state.removed.push(obj);
        });
    }

}
