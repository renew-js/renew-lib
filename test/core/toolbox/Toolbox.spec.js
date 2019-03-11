import { Tool } from '../../../src/core/toolbox/Tool';
import { Tester } from '../../Tester';


describe('core/toolbox - Toolbox', () => {
    let diagram;

    class TestProvider {
        constructor () { }
    }
    class TestTool extends Tool {
        constructor (state) { super(); this.state = state }
        onDisable (event) { this.state.enabled = false; }
        onEnable (event) { this.state.enabled = true; }

        onMouseDown (event) { this.state.mousedown = true; }
        onMouseMove (event) { this.state.mousemove = true; }
        onMouseUp (event) { this.state.mousedown = false; }
    }

    beforeEach(() => {
        diagram = new Tester({
            modules: [
                {
                    __init__: [ 'state' ],
                    __tools__: [
                        [ 'test', TestTool ]
                    ],
                    state: [ 'type', TestProvider ]
                }
            ]
        });
    });

    it('should be defined', function () {
        diagram.invoke((toolbox) => expect(toolbox).toBeDefined());
    });

    it('should activate a tool', function () {
        diagram.invoke((toolbox) => {
            toolbox.activate('test');
            expect(toolbox.activeTool.type).toEqual('test');
        });
    });

    it('should have enable behavior', function () {
        diagram.invoke((toolbox, state) => {
            toolbox.activate('test');
            expect(state.enabled).toBe(true);
        });
    });

    it('should disable behavior on enable other behavior', function () {
        diagram.invoke((toolbox, state) => {
            toolbox.activate('test');
            toolbox.activate('other');
            expect(state.enabled).toBe(false);
        });
    });

    /*
    it('should listen on mouse events', function () {
        diagram.invoke((toolbox, state) => {
            toolbox.activate('test');

            expect(state.mousedown).toBeUndefined();

            mousedown(diagram, { x: 60, y: 60 });

            expect(state.mousedown).toBe(true);
        });
    });
    */
});
