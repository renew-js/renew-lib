import Viewer from '../../src/Viewer';


describe('instances - Viewer', () => {
    let viewer;

    beforeEach(() => {
        viewer = new Viewer();
    });

    it('should be defined', function () {
        expect(viewer).toBeDefined();
    });

    describe('DOM handling', function () {
        it('should have a container', function () {
            expect(viewer.container).toBeDefined();
        });

        it('should attach, detach and reattach', function () {
            const parent = document.createElement('div');

            expect(parent.children.length).toBe(0);

            viewer.attachTo(parent);

            expect(parent.children.length).toBe(1);

            viewer.detach();

            expect(parent.children.length).toBe(0);

            viewer.attachTo(parent);

            expect(parent.children.length).toBe(1);
        });
    });

    describe('Event handling', function () {
        let callback;

        beforeEach(() => callback = () => true);

        it('should register event', function () {
            viewer.on('test', callback);

            const eventBus = viewer.get('eventBus');

            expect(eventBus._listeners.test).toBeDefined();
        });

        it('should fire event', function () {
            viewer.on('test', callback);

            const context = viewer.fire('test');

            expect(context).toBe(true);
        });

        it('should unregister event', function () {
            viewer.on('test', callback);
            viewer.off('test', callback);

            const context = viewer.fire('test');

            expect(context).toBe(undefined);
        });
    });
});
