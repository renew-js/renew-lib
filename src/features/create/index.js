import { CreateShapeCommand } from './commands/CreateShapeCommand';
import { CreateProvider } from './providers/CreateProvider';
import { CreateTool } from './tools/CreateTool';
import { PreviewBehavior } from './behaviors/PreviewBehavior';
import { PlaceShapeBehavior } from './behaviors/PlaceShapeBehavior';


export default {
    __depends__: [

    ],
    __init__: [
        'create',
    ],
    __behaviors__: [
        [ 'create.preview', PreviewBehavior ],
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
