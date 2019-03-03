import OrientationModule from '../orientation';
import DirectEditingModule from 'diagram-js-direct-editing';
import MetaFormalismModule from '../meta-formalism';

import { DoubleClickBehavior } from './behabiors/DoubleClickBehavior';
import { SaveLabelCommand } from './commands/SaveLabelCommand';
import { MetaLabelEditing } from './MetaLabelEditing';


export default {
    __depends__: [
        MetaFormalismModule,
        DirectEditingModule,
        OrientationModule,
    ],
    __init__: [
        'metaLabelEditing',
    ],
    __commands__: [
        [ 'label.save', SaveLabelCommand ],
    ],
    __behaviors__: [
        [ 'element.dblclick', 1500, DoubleClickBehavior ],
    ],
    metaLabelEditing: [ 'type', MetaLabelEditing ],
};
