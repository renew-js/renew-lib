import LayouterModule from '../layouter';
import CursorModule from '../cursor';
import { ConnectFactoryBehavior } from './behaviors/ConnectFactoryBehavior';

import { ConnectTool } from './tools/ConnectTool';
import { ConnectProvider } from './providers/ConnectProvider';
import { ConnectPreviewBehavior } from './behaviors/ConnectPreviewBehavior';
import { ConnectElementsBehavior } from './behaviors/ConnectElementsBehavior';
import { ConnectStartRule } from './rules/ConnectStartRule';
import { ConnectEndRule } from './rules/ConnectEndRule';
import { ConnectElementsCommand } from './commands/ConnectElementsCommand';


export default {
    __depends__: [
        CursorModule,
        LayouterModule,
    ],
    __init__: [
        'connect',
    ],
    __behaviors__: [
        [ 'connect.preview', ConnectPreviewBehavior ],
        [ 'connect.factory', ConnectFactoryBehavior ],
        [ 'connect.elements', ConnectElementsBehavior ],
    ],
    __commands__: [
        [ 'connect.elements', ConnectElementsCommand ],
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
