import CreateModule from 'diagram-js/lib/features/create';
import CommandModule from 'diagram-js/lib/command';
import MoveModule from 'diagram-js/lib/features/move';
import MetaFormalismModule from '../meta-formalism';
import MetaLabelEditingModule from '../meta-label-editing';
import GlobalConnectModule from 'diagram-js/lib/features/global-connect';
import ModelingModule from 'diagram-js/lib/features/modeling';
import SnappingModule from '../snapping';
import ResizeModule from '../resize';

import { MetaFactory } from './MetaFactory';
import { MetaModeling } from './MetaModeling';
import { MetaLayouter } from './MetaLayouter';


export default {
    __depends__: [
        MetaFormalismModule,

        CommandModule,
        ModelingModule,

        CreateModule,
        MoveModule,
        GlobalConnectModule,
        MetaLabelEditingModule,

        SnappingModule,
        ResizeModule,
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
