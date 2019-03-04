import { Tester } from '../../Tester';
import { Behavior } from '../../../src/core/Behavior';


describe('core/toolbox - Toolbox', () => {
    let diagram;

    class TestProvider {
        constructor () { }
    }
    class TestEnableBehavior extends Behavior {
        constructor (state) { super(); this.state = state }
        before (context) { }
        during (context) { this.state.enabled = true; }
        after (context) { }
    }
    class TestDisableBehavior extends Behavior {
        constructor (state) { super(); this.state = state }
        before (context) { }
        during (context) { this.state.enabled = false; }
        after (context) { }
    }

    beforeAll(() => {
        diagram = new Tester({
            modules: [
                {
                    __init__: [ 'state' ],
                    __behaviors__: [
                        [ 'tool.test.enable', 1500, TestEnableBehavior],
                        [ 'tool.test.disable', 1500, TestDisableBehavior],
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
});
