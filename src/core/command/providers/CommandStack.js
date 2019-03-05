import DiagramJsCommandStack from 'diagram-js/lib/command/CommandStack';


export class CommandStack extends DiagramJsCommandStack {
    constructor (eventBus, injector) {
        super(eventBus, injector);
    }

    execute (command, context) {
        if (this.canExecute(command, context)) {
            super.execute(command, context);
        }
    }
}
