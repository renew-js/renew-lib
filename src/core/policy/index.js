import { RulePolicy } from './providers/RulePolicy';


export default {
    __depends__: [ ],
    __init__: [
        'rulePolicy',
    ],
    rulePolicy: [ 'type', RulePolicy ],
};
