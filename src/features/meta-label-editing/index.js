import OrientationModule from '../orientation';
import DirectEditingModule from 'diagram-js-direct-editing';
import MetaFormalismModule from '../meta-formalism';

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
    metaLabelEditing: [ 'type', MetaLabelEditing ],
};
