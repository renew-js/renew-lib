import { ConnectTool } from './tools/ConnectTool';
import { ConnectProvider } from './providers/ConnectProvider';
import { PreviewBehavior } from './behaviors/PreviewBehavior';
import { ConnectBehavior } from './behaviors/ConnectBehavior';
import { ConnectStartRule } from './rules/ConnectStartRule';
import { ConnectEndRule } from './rules/ConnectEndRule';


export default {
    __depends__: [

    ],
    __init__: [
        'connect',
    ],
    __behaviors__: [
        [ 'connect.preview', PreviewBehavior ],
        [ 'connect.shapes', ConnectBehavior ],
    ],
    __commands__: [
    ],
    __rules__: [
        [ 'connect.start', ConnectStartRule ],
        [ 'connect.end', ConnectEndRule ],
    ],
    __tools__: [
        [ 'connect', ConnectTool ],
    ],
    connect: [ 'type', ConnectProvider ],
};
