import { Provider } from '../../../core/Provider';


export class ConnectProvider extends Provider {

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
