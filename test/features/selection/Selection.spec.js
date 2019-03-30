import CreateModule from '../../../src/features/create';
import PointerModule from '../../../src/features/pointer';
import SelectionModule from '../../../src/features/selection';
import { Tester } from '../../Tester';


describe('modules/selection - Selection', () => {
    let diagram;
    let shape1;
    let shape2;
    let selection;
    let canvas;

    beforeEach(() => diagram = new Tester({ modules: [ SelectionModule ] }));

    beforeEach(() => selection = diagram.get('selection'));

    beforeEach(() => canvas = diagram.get('canvas'));

    beforeEach(() => diagram.invoke(function (elementFactory) {
        shape1 = elementFactory.createShape({
            id: 'shape1', x: 100, y: 200, width: 300, height: 400,
        });
        shape2 = elementFactory.createShape({
            id: 'shape2', x: 500, y: 200, width: 300, height: 400,
        });

        canvas.addShape(shape1);
        canvas.addShape(shape2);
    }));

    it('should be defined', () => {
        expect(selection).toBeDefined();
    });

    describe('Provider', () => {

        it('should add to selection', () => {
            selection.select(shape1);

            expect(selection.count()).toBe(1);
        });

        it('should deselect on selection change', () => {
            selection.select(shape1);

            expect(selection.count()).toBe(1);

            selection.select(shape2);

            expect(selection.count()).toBe(1);
        });

        it('should add multiple to selection', () => {
            selection.select([ shape1, shape2 ]);

            expect(selection.count()).toBe(2);
        });

        it('should clear the selection', () => {
            selection.select([ shape1, shape2 ]);

            expect(selection.count()).toBe(2);

            selection.clear();

            expect(selection.count()).toBe(0);
        });
    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should clear the selection', () => {
            selection.select(shape1);

            expect(selection.count()).toBe(1);

            eventBus.fire('selection.clear');

            expect(selection.count()).toBe(0);
        });

        it('should add an element to selection', () => {
            eventBus.fire('selection.add', { elements: shape1 });

            expect(selection.count()).toBe(1);

            eventBus.fire('selection.add', { elements: shape2 });

            expect(selection.count()).toBe(2);
        });
    });

    describe('Tools', () => {
        let toolbox;

        describe('Pointer', () => {

            beforeEach(() => {
                diagram = new Tester({
                    modules: [ SelectionModule, PointerModule ],
                });
                selection = diagram.get('selection');
                toolbox = diagram.get('toolbox');
                toolbox.activate('pointer');
            });

            it('should clear the selection on pointer tool disable', () => {
                selection.select(shape1);

                expect(selection.count()).toBe(1);

                toolbox.activate('test');

                expect(selection.count()).toBe(0);
            });

        });

        describe('Create', () => {
            let create; let createTool; let eventBus;

            beforeEach(() => {
                diagram = new Tester({
                    modules: [ SelectionModule, CreateModule ],
                });
                selection = diagram.get('selection');
                eventBus = diagram.get('eventBus');
                toolbox = diagram.get('toolbox');
                createTool = toolbox.activate('create');
                create = diagram.get('create');
            });

            it('should select the created element', () => {
                expect(selection.count()).toBe(0);

                create.element = shape1;
                eventBus.fire('create.element', {
                    x: 100, y: 200,
                    target: canvas.getRootElement(),
                });

                expect(selection.count()).toBe(1);
            });

        });
    });

});
