import MetaModelingModule from '../meta-formalism';

import BaseImporter from './BaseImporter';
import JsonImporter from './JsonImporter';


export default {
    __depends__: [
        MetaModelingModule,
    ],
    __init__: [
        'baseImporter',
        'jsonImporter',
    ],
    baseImporter: [ 'type', BaseImporter ],
    jsonImporter: [ 'type', JsonImporter ],
};
