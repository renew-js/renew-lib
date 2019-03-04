import MetaFormalismModule from '../meta-formalism';
import ModelingModule from 'diagram-js/lib/features/modeling';
import CreateModule from 'diagram-js/lib/features/create';
import GlobalConnectModule from 'diagram-js/lib/features/global-connect';

import { MetaFactory } from './MetaFactory';
import { MetaModeling } from './MetaModeling';
import { MetaLayouter } from './MetaLayouter';


export default {
    __depends__: [
        MetaFormalismModule,
        ModelingModule,

        CreateModule,
        GlobalConnectModule,
    ],
    __init__: [
        'metaFactory',
        'modeling',
        'layouter',
    ],
    metaFactory: [ 'type', MetaFactory ],
    modeling: [ 'type', MetaModeling ],
    layouter: [ 'type', MetaLayouter ],
};
