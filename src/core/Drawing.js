import Diagram from 'diagram-js';
import SelectionModule from 'diagram-js/lib/features/selection';
import ZoomScrollModule from 'diagram-js/lib/navigation/zoomscroll';
import MoveCanvasModule from 'diagram-js/lib/navigation/movecanvas';
import ModelingModule from 'diagram-js/lib/features/modeling';
import MoveModule from 'diagram-js/lib/features/move';
import OutlineModule from 'diagram-js/lib/features/outline';
import LassoToolModule from 'diagram-js/lib/features/lasso-tool';
import PaletteModule from 'diagram-js/lib/features/palette';
import CreateModule from 'diagram-js/lib/features/create';
import ContextPadModule from 'diagram-js/lib/features/context-pad';
import ConnectModule from 'diagram-js/lib/features/connect';
import RulesModule from 'diagram-js/lib/features/rules';

import MetaModule from '../features/meta-formalism';


/**
 *
 */
export default class Drawing {
    /**
     * @param {string} id
     */
    constructor (id) {
        this.container = document.querySelector('#' + id);
        this.options = {
            canvas: {
                container: this.container,
            },
            modules: [
                SelectionModule, // select elements
                ZoomScrollModule, // zoom canvas
                MoveCanvasModule, // scroll canvas
                ModelingModule, // basic modeling (create/move/remove shapes)
                MoveModule, // move shapes
                OutlineModule, // show element outlines
                LassoToolModule, // lasso tool for element selection
                PaletteModule, // palette
                CreateModule, // create elements
                ContextPadModule, // context pad for elements
                ConnectModule, // connect elements
                RulesModule, // rules
                MetaModule, // meta plugins
            ],
        };
        this.diagram = new Diagram(this.options);
    }

    /**
     * @param {object} plugin
     */
    addFormalism (plugin) {
        this.diagram.get('metaContextPad').addFormalism(plugin);
        this.diagram.get('metaPalette').addFormalism(plugin);
        this.diagram.get('metaRules').addFormalism(plugin);
    }
}
