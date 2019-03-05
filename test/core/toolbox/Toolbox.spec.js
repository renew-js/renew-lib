import { Tester } from '../../Tester';
import { Behavior } from '../../../src/core/Behavior';
import { mousedown } from '../../util/MockEvent';


describe('core/toolbox - Toolbox', () => {
    let diagram;

    class TestProvider {
        constructor () { }
    }
    class TestEnableBehavior extends Behavior {
        constructor (state) { super(); this.state = state }
        during (context) { this.state.enabled = true; }
    }
    class TestDisableBehavior extends Behavior {
        constructor (state) { super(); this.state = state }
        during (context) { this.state.enabled = false; }
    }
    class TestMouseDownBehavior extends Behavior {
        constructor (state) { super(); this.state = state }
        during (context) { console.log('event', context);this.state.mousedown = true; }
    }
    class TestMouseMoveBehavior extends Behavior {
        constructor (state) { super(); this.state = state }
        during (context) { }// this.state.mousedown = true; }
    }
    class TestMouseUpBehavior extends Behavior {
        constructor (state) { super(); this.state = state }
        during (context) { this.state.mousedown = false; }
    }

    beforeEach(() => {
        diagram = new Tester({
            modules: [
                {
                    __init__: [ 'state' ],
                    __behaviors__: [
                        [ 'tool.test.enable', 1500, TestEnableBehavior],
                        [ 'tool.test.disable', 1500, TestDisableBehavior],
                        [ 'tool.test.mousedown', 1500, TestMouseDownBehavior],
                        [ 'tool.test.mousemove', 1500, TestMouseMoveBehavior],
                        [ 'tool.test.mouseup', 1500, TestMouseUpBehavior],
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
            expect(toolbox.activeTool).toEqual('test');
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

    it('should listen on mouse events', function () {
        diagram.invoke((toolbox, state) => {
            toolbox.activate('test');

            expect(state.mousedown).toBeUndefined();

            mousedown(diagram, { x: 60, y: 60 });

            expect(state.mousedown).toBe(true);
        });
    });
});
