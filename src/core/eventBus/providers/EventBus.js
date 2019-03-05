import DiagramJsEventBus from 'diagram-js/lib/core/EventBus';


export default class EventBus extends DiagramJsEventBus {

    constructor () {
        super();
    }

    fire (name, payload) {
        console.log(name);
        super.fire(name + '.start', payload);
        super.fire(name, payload);
        super.fire(name + '.end', payload);
    }

    registerBehavior (name, priority, behavior) {
        this.on(name + '.start', priority, behavior.before.bind(behavior));
        this.on(name, priority, behavior.during.bind(behavior));
        this.on(name + '.end', priority, behavior.after.bind(behavior));
    }

}
