import MetaSnappingModule from '../meta-snapping';
import MetaLayouterModule from '../meta-layouter';

import { MetaFactory } from './MetaFactory';
import { MetaModeling } from './MetaModeling';
import { MetaResize } from './MetaResize';


export default {
    __depends__: [
        MetaSnappingModule,
        MetaLayouterModule,
    ],
    __init__: [
        'metaFactory',
        'metaModeling',
        'metaResize',
    ],
    metaFactory: [ 'type', MetaFactory ],
    metaModeling: [ 'type', MetaModeling ],
    metaResize: [ 'type', MetaResize ],
};
