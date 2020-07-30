import { Command } from '../../../core/command/Command';


export class VisibilityCommand extends Command {

    constructor (commandStack, canvas, selection, remove,
        eventBus, elementRegistry) {
        super();
        this.canvas = canvas;
        this.selection = selection;
        this.remove = remove;
        this.eventBus = eventBus;
        this.elementRegistry = elementRegistry;
        this.commandStack = commandStack;
        this.state = { removed: [], unbind: [] };
        this.visibility = {visibilityHistory:[], unbind: []};
        this.selectedShapes;
    }

    preExecute (context) {
        this.visibility.visibilityHistory.push(context);
        this.selectedShapes = [ ...this.selection.get() ];
        this.selectedShapes.forEach((shape) => {
            if (shape.type==='shape') {
                const element = shape;
                const oldAttribute = element.metaObject.
                representation.attributes.visibility;
            this.state.removed.push([shape,oldAttribute]);
            }
        });
    }

    execute (attribute) {
        this._changeVisibility(attribute);
    }

    _changeVisibility (attribute) {
        const newShapes = [];
        this.state.removed.forEach((shape) => {
            if (shape[0].type==='shape') {
                const element = shape[0];
                element.metaObject.representation.attributes.visibility = attribute;
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
            element.metaObject.representation.attributes.visibility = obj[1];
            const newShape = element;
            this.canvas.addShape(newShape);
            delete this.state.removed[index];
            this.state.removed.push(obj);
        });
    }

}
