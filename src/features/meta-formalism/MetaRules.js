import RuleProvider from 'diagram-js/lib/features/rules/RuleProvider';


export class MetaRules extends RuleProvider {
    constructor (eventBus) {
        super(eventBus);
    }

    init () {
        this.addRule('connection.start', function (context) {
            // console.log('start', context);
            return true;
        });
        this.addRule('connection.reconnectStart', function (context) {
            // console.log('reconnectStart', context);
            return true;
        });
        this.addRule('connection.reconnectEnd', function (context) {
            // console.log('reconnectEnd', context);
            return true;
        });
        this.addRule('connection.create', function (context) {
            return true;
        });
    }
}
