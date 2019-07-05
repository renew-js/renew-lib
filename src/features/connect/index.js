import LayouterModule from '../layouter';
import CursorModule from '../cursor';
import FactoryModule from '../factory';

import { ConnectProvider } from './providers/ConnectProvider';
import { ConnectPreviewBehavior } from './behaviors/ConnectPreviewBehavior';
import { ConnectSourceRule } from './rules/ConnectSourceRule';
import { ConnectTargetRule } from './rules/ConnectTargetRule';


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
    ],
    __commands__: [],
    __rules__: [
        [ 'connect.source', ConnectSourceRule ],
        [ 'connect.target', ConnectTargetRule ],
    ],
    __tools__: [],

    connect: [ 'type', ConnectProvider ],
};
