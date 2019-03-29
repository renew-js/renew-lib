import { CreateCursorBehavior } from './behaviors/CreateCursorBehavior';
import { CreateFactoryBehavior } from './behaviors/CreateFactoryBehavior';
import { CreateMarkerBehavior } from './behaviors/CreateMarkerBehavior';
import { CreatePreviewBehavior } from './behaviors/CreatePreviewBehavior';
import { CreateShapeCommand } from './commands/CreateShapeCommand';
import { CreateProvider } from './providers/CreateProvider';
import { CreateTool } from './tools/CreateTool';
import { CreateElementBehavior } from './behaviors/CreateElementBehavior';


export default {
    __depends__: [],
    __init__: [
        'create',
    ],
    __behaviors__: [
        [ 'create.element', CreateElementBehavior ],
        [ 'create.preview', CreatePreviewBehavior ],
        [ 'create.marker', CreateMarkerBehavior ],
        [ 'create.cursor', CreateCursorBehavior ],
        [ 'create.factory', CreateFactoryBehavior ],
    ],
    __commands__: [
        [ 'create.element', CreateShapeCommand ],
    ],
    __rules__: [],
    __tools__: [
        [ 'create', CreateTool ],
    ],
    create: [ 'type', CreateProvider ],
};
