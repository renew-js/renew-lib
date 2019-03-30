import { annotate, Injector as DiDiInjector } from 'didi';
import deprecated from './deprecated';

const PRIORITY_DEFAULT = 1000;

let providers = [];
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

        providers = providers.concat(module.__init__ || []);
        commands = commands.concat(module.__commands__ || []);
        behaviors = behaviors.concat(module.__behaviors__ || []);
        rules = rules.concat(module.__rules__ || []);
        tools = tools.concat(module.__tools__ || []);
    };

    modules.forEach(visit);

    return result;
};

export class Injector extends DiDiInjector {

    constructor (modules) {
        super(bootstrap(modules));
        this.copy();
        this.initialize();
        this.clear();
    }

    copy () {
        this.providers = providers;
        this.commands = commands;
        this.behaviors = behaviors;
        this.rules = rules;
        this.tools = tools;
    }

    initialize() {
        this.providers.forEach(this.initProvider.bind(this));
        this.commands.forEach(this.initCommand.bind(this));
        this.behaviors.forEach(this.initBehavior.bind(this));
        this.rules.forEach(this.initRule.bind(this));
        this.tools.forEach(this.initTool.bind(this));
    }

    load () {
        providers = this.providers;
        commands = this.commands;
        behaviors = this.behaviors;
        rules = this.rules;
        tools = this.tools;
    }

    clear () {
        providers = [ ];
        commands = [ ];
        behaviors = [ ];
        rules = [ ];
        tools = [ ];
    }

    loadModule (module) {
        this.load();
        bootstrap([ module ]);
        this.copy();
        this.registerProviders(module);
        this.initialize();
        this.clear();
    }

    registerProviders (module) {
        Object.keys(module).forEach((name) => {
            const type = module[name][0];
            const value = module[name][1];
            const factoryMap = {
                factory: this.invoke, type: this.instantiate, value: (v) => v
            };
            const annotate = () => {
                let args = Array.prototype.slice.call(arguments);
                if (args.length === 1 && Array.isArray(args[0])) args = args[0];
                const fn = args.pop();
                fn.$inject = args;
                return fn;
            };
            const arrayUnwrap = (type, value) => {
                if (type !== 'value' && Array.isArray(value)) {
                    return annotate(value.slice());
                }
                return value;
            };

            this._providers[name] = [
                factoryMap[type],
                arrayUnwrap(type, value),
                type
            ];
        });
    }

    initProvider (component) {
        try {
            if (typeof component === 'string') {
                if (deprecated.providers.indexOf(component) >= 0) {
                    const warning = 'You are using a deprecated provider: ';
                    console.warn(warning, component);
                }

                this.get(component);
            } else {
                this.invoke(component);
            }
        } catch (e) {
            console.error('Failed to instantiate component', component);
        }
    }

    initCommand (command) {
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
