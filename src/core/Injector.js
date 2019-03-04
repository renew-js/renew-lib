import { Injector as DiDiInjector } from 'didi';


export class Injector extends DiDiInjector {

    constructor (modules) {
        let components = [];
        let commands = [];
        let behaviors = [];
        let rules = [];

        const bootstrap = (modules) => {
            const result = [];

            const visited = (module) => result.indexOf(module) !== -1;

            const visit = (module) => {
                if (visited(module)) return;

                (module.__depends__ || []).forEach(visit);

                if (visited(module)) return;

                result.push(module);

                components = components.concat(module.__init__ || []);
                commands = commands.concat(module.__commands__ || []);
                behaviors = behaviors.concat(module.__behaviors__ || []);
                rules = rules.concat(module.__rules__ || []);
            };

            modules.forEach(visit);

            return result;
        };

        super(bootstrap(modules));

        components.forEach(this.initComponent.bind(this));
        commands.forEach(this.initCommands.bind(this));
        behaviors.forEach(this.initBehavior.bind(this));
        rules.forEach(this.initRule.bind(this));
    }

    initComponent (component) {
        try {
            if (typeof component === 'string') {
                this.get(component);
            } else {
                this.invoke(component);
            }
        } catch (e) {
            console.error('Failed to instantiate component', component);
        }
    }

    initCommands (command) {
        this.get('commandStack').registerHandler(command[0], command[1]);
    }

    initBehavior (behavior) {
        const instance = this.instantiate(behavior[2]);

        this.get('eventBus').on(
            behavior[0] + '.start',
            behavior[1],
            instance.before.bind(instance)
        );
        this.get('eventBus').on(
            behavior[0] + '.move',
            behavior[1],
            instance.during.bind(instance)
        );
        this.get('eventBus').on(
            behavior[0] + '.end',
            behavior[1],
            instance.after.bind(instance)
        );
    }

    initRule (rule) {
        // TODO: use custom rules
        // this.get('');
    }

}
