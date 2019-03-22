import MetaModelingModule from '../meta-formalism';

import BaseImporter from './BaseImporter';
import JsonImporter from './JsonImporter';
import PnmlImporter from './PnmlImporter';


export default {
    __depends__: [
        MetaModelingModule,
    ],
    __init__: [
        'baseImporter',
        'jsonImporter',
        'pnmlImporter',
    ],
    baseImporter: [ 'type', BaseImporter ],
    jsonImporter: [ 'type', JsonImporter ],
    pnmlImporter: [ 'type', PnmlImporter ],
};
