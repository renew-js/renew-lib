import { ConnectTool } from './tools/ConnectTool';
import { ConnectProvider } from './providers/ConnectProvider';


export default {
    __depends__: [

    ],
    __init__: [
        'connect',
    ],
    __behaviors__: [
    ],
    __commands__: [
    ],
    __rules__: [
    ],
    __tools__: [
        [ 'connect', ConnectTool ],
    ],
    connect: [ 'type', ConnectProvider ],
};
