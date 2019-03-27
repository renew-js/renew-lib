import CoreModule from '../../core';
import MetaFormalismModule from '../meta-formalism';

import { ImportBehavior } from './behaviors/ImportBehavior';
import { JsonImportBehavior } from './behaviors/JsonImportBehavior';
import { MetaImportBehavior } from './behaviors/MetaImportBehavior';
import { Importer } from './providers/Importer';
import { JsonParser } from './providers/JsonParser';

export default {
    __depends__: [
        CoreModule,
        MetaFormalismModule,
    ],
    __init__: [
        'importer',
        'jsonParser',
    ],
    __behaviors__: [
        [ 'import', 1500, ImportBehavior ],
        [ 'import.json', 1500, JsonImportBehavior ],
        [ 'import.meta', 1500, MetaImportBehavior ],
    ],
    importer: [ 'type', Importer ],
    jsonParser: [ 'type', JsonParser ],
};
