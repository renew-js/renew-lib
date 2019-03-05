import { CleanUpBehavior } from './behaviors/CleanUpBehavior';
import { EnableBehavior } from './behaviors/EnableBehavior';
import { CreateShapeCommand } from './commands/CreateShapeCommand';
import { CreateProvider } from './providers/CreateProvider';
import { MouseDownBehavior } from './behaviors/MouseDownBehavior';
import { PlaceFigureBehavior } from './behaviors/PlaceFigureBehavior';
import { PreviewBehavior } from './behaviors/PreviewBehavior';
import { CreateShapeRule } from './rules/CreateShapeRule';


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
        [ 'shape.create', 1500, CreateShapeRule ],
    ],
    __behaviors__: [
        [ 'tool.create.enable', 1500, EnableBehavior ],
        [ 'tool.create.disable', 1500, CleanUpBehavior ],
        [ 'tool.create.onMouseDown', 1500, MouseDownBehavior ],
        [ 'tool.create.onMouseMove', 1500, PreviewBehavior ],
        [ 'tool.create.onMouseUp', 500, PlaceFigureBehavior ],
//        [ 'tool.create', 1500, CreateBehavior ],
//        [ 'create.preview', 1500, PreviewBehavior ],
    ],
    create: [ 'type', CreateProvider ],
};
