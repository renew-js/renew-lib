export class Toolbox {

    constructor (eventBus) {
        this.eventBus = eventBus;
        this.activeTool = null;
    }

    activate (name, context) {
        this.eventBus.fire('tool.' + this.activeTool + '.disable', context);
        this.activeTool = name;
        this.eventBus.fire('tool.' + this.activeTool + '.enable', context);
    }

    onMouseDown (context) {
        this.eventBus.fire('tool.' + this.activeTool + '.onMouseDown', context);
    }

    onMouseUp (context) {
        this.eventBus.fire('tool.' + this.activeTool + '.onMouseUp', context);
    }

    onMouseMove (context) {
        this.eventBus.fire('tool.' + this.activeTool + '.onMouseMove', context);
    }

    onClick (context) {
        this.eventBus.fire('tool.' + this.activeTool + '.onClick', context);
    }

}
