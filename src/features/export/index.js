import MetaModelingModule from '../meta-modeling';

import BaseExporter from './BaseExporter';
import JsonExporter from './JsonExporter';
import PnmlExporter from './PnmlExporter';


export default {
    __depends__: [
        MetaModelingModule,
    ],
    __init__: [
        'baseExporter',
        'jsonExporter',
        'pnmlExporter',
    ],
    baseExporter: [ 'type', BaseExporter ],
    jsonExporter: [ 'type', JsonExporter ],
    pnmlExporter: [ 'type', PnmlExporter ],
};
