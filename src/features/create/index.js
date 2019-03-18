import PreviewModule from '../preview';

import { CreateShapeCommand } from './commands/CreateShapeCommand';
import { CreateProvider } from './providers/CreateProvider';
import { CreateTool } from './tools/CreateTool';
import { CreatePreviewBehavior } from './behaviors/CreatePreviewBehavior';
import { PlaceShapeBehavior } from './behaviors/PlaceShapeBehavior';


export default {
    __depends__: [
        PreviewModule,
    ],
    __init__: [
        'create',
    ],
    __behaviors__: [
        [ 'create.preview', CreatePreviewBehavior ],
        [ 'create.place', PlaceShapeBehavior ],
    ],
    __commands__: [
        [ 'tool.shape.create', CreateShapeCommand ],
    ],
    __rules__: [
    ],
    __tools__: [
        [ 'create', CreateTool ],
    ],
    create: [ 'type', CreateProvider ],
};
