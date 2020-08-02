
import { FontSizeBehavior } from './behaviors/FontSizeBehavior';
import { TextColorBehavior } from './behaviors/TextColorBehavior';
import { TextAlignmentBehavior } from './behaviors/TextAlignmentBehavior';
import { FontStyleBehavior } from './behaviors/FontStyleBehavior';
import { FontStyleCommand } from './command/FontStyleCommand';
import { TextStyleProvider } from './providers/TextStyleProvider';
import { FontSizeCommand } from './command/FontSizeCommand';
import { TextAlignmentCommand } from './command/TextAlignmentCommand';
import { TextColorCommand } from './command/TextColorCommand';
import { FontWeightBehavior } from './behaviors/FontWeightBehavior';
import { FontWeightCommand } from './command/FontWeightCommand';

import { TextDecorationBehavior } from './behaviors/TextDecorationBehavior';
import { TextDecorationCommand } from './command/TextDecorationCommand';
import { FontFamilyCommand } from './command/FontFamilyCommand';
import { FontFamilyBehavior } from './behaviors/FontFamilyBehavior';

export default {
    __depends__: [],
    __init__: [
        'textstyle',
    ],
    __behaviors__: [
        [ 'textstyle.fontstyle', FontStyleBehavior ],
        [ 'textstyle.fontweight', FontWeightBehavior ],
        [ 'textstyle.textdecoration', TextDecorationBehavior ],
        [ 'textstyle.fontsize', FontSizeBehavior ],
        [ 'textstyle.textalignment', TextAlignmentBehavior ],
        [ 'textstyle.textcolor', TextColorBehavior ],
        [ 'textstyle.fontfamily', FontFamilyBehavior ],
    ],
    __commands__: [
        [ 'textstyle.fontstyle', FontStyleCommand ],
        [ 'textstyle.fontweight', FontWeightCommand ],
        [ 'textstyle.textdecoration', TextDecorationCommand ],
        [ 'textstyle.fontsize', FontSizeCommand ],
        [ 'textstyle.textalignment', TextAlignmentCommand ],
        [ 'textstyle.textcolor', TextColorCommand ],
        [ 'textstyle.fontfamily', FontFamilyCommand ],
    ],
    __rules__: [],
    __tools__: [],

    textstyle: [ 'type', TextStyleProvider ],
};
