import MetaFormalismModule from '../meta-formalism';

import BaseExporter from './BaseExporter';
import JsonExporter from './JsonExporter';
import PnmlExporter from './PnmlExporter';


export default {
    __depends__: [
        MetaFormalismModule,
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
