export class Toolbox {

    constructor (eventBus) {
        this.eventBus = eventBus;
        this.activeTool = null;
    }

    activate (name) {
        this.eventBus.fire('tool.' + name + '.disable', context);
        this.activeTool = name;
        this.eventBus.fire('tool.' + name + '.activate', context);
    }

    onMouseDown (event) {
        this.eventBus.fire('tool.' + name + '.onMouseDown', context);
    }

    onMouseUp (event) {
        this.eventBus.fire('tool.' + name + '.onMouseUp', context);
    }

    onMouseMove (event) {
        this.eventBus.fire('tool.' + name + '.onMouseMove', context);
    }

    onClick (event) {
        this.eventBus.fire('tool.' + name + '.onClick', context);
    }

}
