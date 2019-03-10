import { CreateShapeCommand } from './commands/CreateShapeCommand';
import { CreateProvider } from './providers/CreateProvider';
import { ShapePreviewRule } from './rules/ShapePreviewRule';
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
        [ 'shape.create', CreateShapeCommand ],
    ],
    __rules__: [
        [ 'shape.preview', ShapePreviewRule ],
    ],
    __tools__: [
        [ 'create', CreateTool ]
    ],
    create: [ 'type', CreateProvider ],
};
