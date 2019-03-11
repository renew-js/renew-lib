import DiagramJsEventBus from 'diagram-js/lib/core/EventBus';


export default class EventBus extends DiagramJsEventBus {

    constructor () {
        super();
    }

    fire (name, payload) {
        super.fire(name + '.start', payload);
        const result = super.fire(name, payload);
        super.fire(name + '.end', payload);
        return result;
    }

    registerBehavior (name, priority, behavior) {
        const breadcrumbs = name.split('.');

        if (breadcrumbs.length > 2) {
            if (typeof behavior[breadcrumbs[2]] === 'function') {
                this.on(name, behavior[breadcrumbs[2]].bind(behavior));
            }
        } else {
            this.on(name + '.start', priority, behavior.before.bind(behavior));
            this.on(name, priority, behavior.during.bind(behavior));
            this.on(name + '.end', priority, behavior.after.bind(behavior));
        }
    }

}
