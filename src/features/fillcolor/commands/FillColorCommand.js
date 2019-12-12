import { Command } from '../../../core/command/Command';


export class FillColorCommand extends Command {

    constructor (commandStack, canvas, selection, remove, eventBus, elementRegistry) {
        super();
        this.canvas = canvas;
        this.selection = selection;
        this.remove = remove;
        this.eventBus = eventBus;
        this.elementRegistry = elementRegistry;
        this.commandStack = commandStack;
        this.state = { removed: [],  unbind: [] };
        this.newState = { added: [],  unbind: [] };
    }

    preExecute (context) {
       
    }

    execute (color) {
        this._fillColor(color);
    }

    _fillColor (color) {          
        const selectedShapes = [...this.selection.get()];
        const newShapes = [];
        selectedShapes.forEach((shape) => {
            if(shape.type==="shape"){  
                const element = shape;
                const strHelper1 =  element.metaObject.representation.attributes.style;
                const strHelper2 = strHelper1.split(";",1);
                var asd = strHelper2+";";
                var oldColor = asd.substring(
                    asd.lastIndexOf(":") + 1, 
                    asd.lastIndexOf(";")
                );
                const newStyle = strHelper1.replace(strHelper2, "fill:"+color);               
                element.metaObject.representation.attributes.style = newStyle;
                const newShape = element;
                this.state.removed.push([shape,oldColor]);
                this.canvas.remove(shape);
                this.newState.added.push([newShape,color]);
                this.canvas.addShape(newShape);
                newShapes.push(newShape);
            }
        });  
        this.selection.add(newShapes);         
    }


    revert (context) {
        this.newState.added.forEach((element) => {
            this.canvas.remove(element[0]);                            
        });
        this.state.removed.forEach((obj) => { 
            const element = obj[0];
            const strHelper1 =  element.metaObject.representation.attributes.style;
            const strHelper2 = strHelper1.split(";",1);
            const newStyle = strHelper1.replace(strHelper2, "fill:"+obj[1]);               
            element.metaObject.representation.attributes.style = newStyle;
            const newShape = element;
            this.canvas.addShape(newShape);          
        });        
    }

}
