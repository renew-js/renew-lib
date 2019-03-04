export class Toolbox {

    constructor (eventBus) {
        this.eventBus = eventBus;
        this.tools = { };
        this.activeTool = null;
    }

    registerTool (name, instance) {
        this.tools[name] = instance;
    }

    activate (name, context) {
        this.eventBus.fire(name + '.disable', context);
        this.activeTool = this.tools[name];
        this.eventBus.fire(name + '.activate', context);
    }

}
