import { StateCommand } from './commands/StateCommand';
import { TestCommand } from './commands/TestCommand';
import { TestProvider } from './providers/TestProvider';


export default {
    __depends__: [],
    __init__: [
        'test',
    ],
    __behaviors__: [],
    __commands__: [
        [ 'test.command', TestCommand ],
        [ 'test.state', StateCommand ],
    ],
    __rules__: [],
    __tools__: [],

    test: [ 'type', TestProvider ],
};
