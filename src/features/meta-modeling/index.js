import MetaSnappingModule from '../meta-snapping';

import { MetaFactory } from './MetaFactory';
import { MetaModeling } from './MetaModeling';
import { MetaResize } from './MetaResize';


export default {
    __depends__: [
        MetaSnappingModule,
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
