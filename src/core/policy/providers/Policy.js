export class Policy {
    constructor () {
        this.rules = { }
    }

    registerRule (name, priority, rule) {
        if (!this.rules[name]) {
            this.rules[name] = [];
        }

        if (!rule.validate) {
            rule = { validate: rule };
        }

        this.rules[name].push(rule);

        // TODO sort by priority
    }

    /**
     *
     * @param {String} command
     * @param {Object} context
     * @returns {Boolean}
     */
    allowed (command, context) {
        if (!this.rules[command]) {
            return true;
        }

        return this.rules[command].every(rule => rule.validate(context));
    }
}
