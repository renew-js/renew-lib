import { Tool } from '../../../src/core/toolbox/Tool';
import { Tester } from '../../Tester';


describe('core/toolbox - Toolbox', () => {
    let diagram;
    let toolbox;
    let state;

    class TestProvider {

        constructor () { }

    }
    class TestTool extends Tool {

        constructor (state) {
            super();
            this.state = state;
        }
        onDisable (event) {
            this.state.enabled = false;
        }
        onEnable (event) {
            this.state.enabled = true;
        }

        onMouseDown (event) {
            this.state.mousedown = true;
        }
        onMouseMove (event) {
            this.state.mousemove = true;
        }
        onMouseUp (event) {
            this.state.mousedown = false;
        }

    }

    beforeEach(() => {
        diagram = new Tester({
            modules: [
                {
                    __init__: [ 'state' ],
                    __tools__: [
                        [ 'test', TestTool ],
                    ],
                    state: [ 'type', TestProvider ],
                },
            ],
        });
    });

    beforeEach(() => toolbox = diagram.get('toolbox'));

    beforeEach(() => state = diagram.get('state'));

    it('should be defined', function () {
        expect(toolbox).toBeDefined();
    });

    it('should activate a tool', function () {
        toolbox.activate('test');

        expect(toolbox.activeTool.type).toEqual('test');
    });

    it('should have enable behavior', function () {
        toolbox.activate('test');

        expect(state.enabled).toBe(true);
    });

    it('should disable behavior on enable other behavior', function () {
        toolbox.activate('test');
        toolbox.activate('other');

        expect(state.enabled).toBe(false);
    });

    it('should set and activate a default tool', function () {
        toolbox.setDefaultTool('test');
        toolbox.activateDefault();

        expect(toolbox.activeTool.type).toEqual('test');
    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should activate tool', () => {
            eventBus.fire('toolbox.activate', { tool: 'test' });

            expect(state.enabled).toBe(true);
        });

        it('should bind dom events after attach', () => {
            eventBus.fire('attach.end');

            expect(toolbox.mouseDownListener).not.toBe(null);
            expect(toolbox.mouseMoveListener).not.toBe(null);
            expect(toolbox.mouseUpListener).not.toBe(null);
        });

        it('should unbind dom events before detach', () => {
            eventBus.fire('detach.start');

            expect(toolbox.mouseDownListener).toBe(null);
            expect(toolbox.mouseMoveListener).toBe(null);
            expect(toolbox.mouseUpListener).toBe(null);
        });

        it('should reset tool before detach', () => {
            eventBus.fire('toolbox.activate', { tool: 'test' });

            eventBus.fire('detach.start');

            expect(state.enabled).toBe(false);
        });
    });
});
