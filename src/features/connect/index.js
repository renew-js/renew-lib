import LayouterModule from '../layouter';
import CursorModule from '../cursor';
import FactoryModule from '../factory';

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
        FactoryModule,
    ],
    __init__: [
        'connect',
    ],
    __behaviors__: [
        [ 'connect.preview', ConnectPreviewBehavior ],
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
