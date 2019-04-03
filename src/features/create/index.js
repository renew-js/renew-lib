import FactoryModule from '../factory';

import { CreateMarkerBehavior } from './behaviors/CreateMarkerBehavior';
import { CreatePreviewBehavior } from './behaviors/CreatePreviewBehavior';
import { CreateShapeCommand } from './commands/CreateShapeCommand';
import { CreateProvider } from './providers/CreateProvider';
import { CreateTool } from './tools/CreateTool';
import { CreateShapeBehavior } from './behaviors/CreateShapeBehavior';


export default {
    __depends__: [
        FactoryModule,
    ],
    __init__: [
        'create',
    ],
    __behaviors__: [
        [ 'create.shape', CreateShapeBehavior ],
        [ 'create.preview', CreatePreviewBehavior ],
        [ 'create.marker', CreateMarkerBehavior ],
    ],
    __commands__: [
        [ 'create.shape', CreateShapeCommand ],
    ],
    __rules__: [],
    __tools__: [
        [ 'create', CreateTool ],
    ],
    create: [ 'type', CreateProvider ],
};
