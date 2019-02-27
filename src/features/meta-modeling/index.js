import MetaSnappingModule from '../meta-snapping';
import MetaLayouterModule from '../meta-layouter';

import { MetaFactory } from './MetaFactory';
import { MetaModeling } from './MetaModeling';
import { MetaResize } from './MetaResize';
import { MetaText } from './MetaText';


export default {
    __depends__: [
        MetaSnappingModule,
        MetaLayouterModule,
    ],
    __init__: [
        'metaFactory',
        'metaModeling',
        'metaResize',
        'metaText'
    ],
    metaFactory: [ 'type', MetaFactory ],
    metaModeling: [ 'type', MetaModeling ],
    metaResize: [ 'type', MetaResize ],
    metaText: [ 'type', MetaText ],
};
