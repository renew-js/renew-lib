import CoreModule from '../../core';
import MetaFormalismModule from '../meta-formalism';

import { ImportBehavior } from './behaviors/ImportBehavior';
import { JsonImportBehavior } from './behaviors/JsonImportBehavior';
import { MetaImportBehavior } from './behaviors/MetaImportBehavior';
import { Importer } from './providers/Importer';
import { JsonImportParser } from './providers/JsonImportParser';

export default {
    __depends__: [
        CoreModule,
        MetaFormalismModule,
    ],
    __init__: [
        'importer',
        'jsonImportParser',
    ],
    __behaviors__: [
        [ 'import', 1500, ImportBehavior ],
        [ 'import.json', 1500, JsonImportBehavior ],
        [ 'import.meta', 1500, MetaImportBehavior ],
    ],
    importer: [ 'type', Importer ],
    jsonImportParser: [ 'type', JsonImportParser ],
};
