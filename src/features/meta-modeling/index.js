import MetaSnappingModule from '../meta-snapping';
import MetaLayouterModule from '../meta-layouter';
import DirectEditingModule from 'diagram-js-direct-editing';
import OrientationModule from "../orientation";

import { MetaFactory } from './MetaFactory';
import { MetaModeling } from './MetaModeling';
import { MetaResize } from './MetaResize';
import { MetaLabelEditing } from './MetaLabelEditing';


export default {
    __depends__: [
        MetaSnappingModule,
        MetaLayouterModule,
        DirectEditingModule,
        OrientationModule
    ],
    __init__: [
        'metaFactory',
        'metaModeling',
        'metaResize',
        'metaLabelEditing'
    ],
    metaFactory: [ 'type', MetaFactory ],
    metaModeling: [ 'type', MetaModeling ],
    metaResize: [ 'type', MetaResize ],
    metaLabelEditing: [ 'type', MetaLabelEditing ],
};
