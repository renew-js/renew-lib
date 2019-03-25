import { Behavior } from '../../../core/eventBus/Behavior';


export class ConnectBehavior extends Behavior {

    constructor (commandStack) {
        super();
        this.commandStack = commandStack;
    }

    before (event) {
        const type = event.context.config.type;
        event.connection = event.context.factory.createElement(type);
    }

    during (event) {
        this.commandStack.execute('tool.connect.shapes', event);
    }

}
