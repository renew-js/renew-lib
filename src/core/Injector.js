import { Injector as DiDiInjector } from 'didi';

const PRIORITY_DEFAULT = 1000;


export class Injector extends DiDiInjector {

    constructor (modules) {
        let components = [];
        let commands = [];
        let behaviors = [];
        let rules = [];
        let tools = [];

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
                tools = tools.concat(module.__tools__ || []);
            };

            modules.forEach(visit);

            return result;
        };

        super(bootstrap(modules));

        components.forEach(this.initComponent.bind(this));
        commands.forEach(this.initCommands.bind(this));
        behaviors.forEach(this.initBehavior.bind(this));
        rules.forEach(this.initRule.bind(this));
        tools.forEach(this.initTool.bind(this));
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
        command[1].$inject = undefined;
        this.get('commandStack').registerHandler(command[0], command[1]);
    }

    initBehavior (behavior) {
        if (behavior.length < 3) {
            behavior[2] = behavior[1];
            behavior[1] = PRIORITY_DEFAULT;
        }

        behavior[2].$inject = undefined;
        this.get('eventBus').registerBehavior(
            behavior[0],
            behavior[1],
            this.instantiate(behavior[2])
        );
    }

    initRule (rule) {
        if (rule.length < 3) {
            rule[2] = rule[1];
            rule[1] = PRIORITY_DEFAULT;
        }

        rule[2].$inject = undefined;
        this.get('policy').registerRule(
            rule[0],
            rule[1],
            this.instantiate(rule[2])
        );
    }

    initTool (tool) {
        tool[1].$inject = undefined;
        this.get('toolbox').registerTool(tool[0], this.instantiate(tool[1]));
    }

}
