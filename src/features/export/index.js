import MetaFormalismModule from '../meta-formalism';

import { ExportBehavior } from './behaviors/ExportBehavior';
import { JsonExportBehavior } from './behaviors/JsonExportBehavior';
import { SVGExportBehavior } from './behaviors/SVGExportBehavior';
import { MetaExportBehavior } from './behaviors/MetaExportBehavior';
import { Exporter } from './providers/Exporter';
import { JsonSerializer } from './providers/JsonSerializer';
import { SVGSerializer } from './providers/SVGSerializer';


export default {
    __depends__: [
        MetaFormalismModule,
    ],
    __init__: [
        'exporter',
        'jsonSerializer',
        'svgSerializer',
    ],
    __behaviors__: [
        [ 'export', 1500, ExportBehavior ],
        [ 'export.json', 1500, JsonExportBehavior ],
        [ 'export.svg', 1500, SVGExportBehavior ],
        [ 'export.meta', 1500, MetaExportBehavior ],
    ],
    exporter: [ 'type', Exporter ],
    jsonSerializer: [ 'type', JsonSerializer ],
    svgSerializer: [ 'type', SVGSerializer ],
};
