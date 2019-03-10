import { CleanUpBehavior } from './behaviors/CleanUpBehavior';
import { EnableBehavior } from './behaviors/EnableBehavior';
import { CreateShapeCommand } from './commands/CreateShapeCommand';
import { CreateProvider } from './providers/CreateProvider';
import { MouseDownBehavior } from './behaviors/MouseDownBehavior';
import { PlaceFigureBehavior } from './behaviors/PlaceFigureBehavior';
import { PreviewBehavior } from './behaviors/PreviewBehavior';
import { ShapePreviewRule } from './rules/ShapePreviewRule';


export default {
    __depends__: [

    ],
    __init__: [
        'create',
    ],
    __commands__: [
        [ 'shape.create', CreateShapeCommand ],
    ],
    __rules__: [
        [ 'shape.preview', ShapePreviewRule ],
    ],
    __behaviors__: [
        [ 'tool.create.enable', EnableBehavior ],
        [ 'tool.create.disable', CleanUpBehavior ],
        [ 'tool.create.onMouseDown', MouseDownBehavior ],
        [ 'tool.create.onMouseMove', PreviewBehavior ],
        [ 'tool.create.onMouseUp', PlaceFigureBehavior ],
//        [ 'tool.create', 1500, CreateBehavior ],
//        [ 'create.preview', 1500, PreviewBehavior ],
    ],
    create: [ 'type', CreateProvider ],
};
