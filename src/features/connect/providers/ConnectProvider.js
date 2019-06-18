export class ConnectProvider {

    constructor (rulePolicy) {
        this.rulePolicy = rulePolicy;
    }

    source (connection, source) {
        if (this.rulePolicy.validate('connect.source')) {
            console.log('connect source');
        }
    }

    target (connection, target) {
        if (this.rulePolicy.validate('connect.source')) {
            console.log('connect target');
        }
    }

}
