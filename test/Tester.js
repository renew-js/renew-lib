import Diagram from 'diagram-js';
import CoreModule from '../src/core';
import DrawModule from '../src/draw';

import { Injector } from '../src/core/Injector';


export class Tester extends Diagram {

    constructor (options = { modules: [ ], canvas: { } }) {
        const container = document.createElement('div');
        container.className = 'rnw-container';
        Object.assign({ canvas: { container: container } }, options);
        super({ }, new Injector([
            { 'config': [ 'value', options ] },
            CoreModule,
            DrawModule,
        ].concat(options.modules)));
    }

}
