import CursorModule from '../cursor';
import FactoryModule from '../factory';
import MarkerModule from '../marker';
import PreviewModule from '../preview';
import LayouterModule from '../layouter';

import { CreateConnectionBehavior } from './behaviors/CreateConnectionBehavior';
import { CreateLabelBehavior } from './behaviors/CreateLabelBehavior';
import { CreateShapeBehavior } from './behaviors/CreateShapeBehavior';
import { CreateConnectionCommand } from './commands/CreateConnectionCommand';
import { CreateLabelCommand } from './commands/CreateLabelCommand';
import { CreateShapeCommand } from './commands/CreateShapeCommand';
import { CreateProvider } from './providers/CreateProvider';
import { CreateConnectionTool } from './tools/CreateConnectionTool';
import { CreateLabelTool } from './tools/CreateLabelTool';
import { CreateShapeTool } from './tools/CreateShapeTool';


export default {
    __depends__: [
        FactoryModule,
        CursorModule,
        MarkerModule,
        PreviewModule,
        LayouterModule,
    ],
    __init__: [
        'create',
    ],
    __behaviors__: [
        [ 'create.shape', CreateShapeBehavior ],
        [ 'create.connection', CreateConnectionBehavior ],
        [ 'create.label', CreateLabelBehavior ],
    ],
    __commands__: [
        [ 'create.shape', CreateShapeCommand ],
        [ 'create.connection', CreateConnectionCommand ],
        [ 'create.label', CreateLabelCommand ],
    ],
    __rules__: [],
    __tools__: [
        [ 'create.shape', CreateShapeTool ],
        [ 'create.connection', CreateConnectionTool ],
        [ 'create.label', CreateLabelTool ],
    ],
    create: [ 'type', CreateProvider ],
};
