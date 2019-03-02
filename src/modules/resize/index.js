import { Resize } from './Resize';
import ResizeModule from 'diagram-js/lib/features/resize';
import RulesModule from 'diagram-js/lib/features/rules';
import DraggingModule from 'diagram-js/lib/features/dragging';
import PreviewSupportModule from 'diagram-js/lib/features/preview-support';


export default {
    __depends__: [
        ResizeModule,
        RulesModule,
        DraggingModule,
        PreviewSupportModule
    ],
    __init__: [
        'resize',
    ],
    resize: [ 'type', Resize ],
};
