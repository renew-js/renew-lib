import { Tester } from '../../Tester';
import EditModule from '../../../src/features/edit';
import { TestFactory } from '../../util/TestFactory';


describe('modules/edit - Edit', () => {
    let diagram;
    let edit;
    let canvas;
    let testFactory;
    let label;

    beforeAll(() => {
        testFactory = new TestFactory();
    });

    beforeEach(() => {
        diagram = new Tester({ modules: [ EditModule ] });
        edit = diagram.get('edit');
        canvas = diagram.get('canvas');
        label = testFactory.createLabel({
            x: 50,
            y: 50,
            width: 20,
            height: 20,
        });
        canvas.addShape(label);
    });

    it('should be defined', () => {
        expect(edit).toBeDefined();
    });

    describe('Provider', () => {

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should activate direct editing', () => {
            eventBus.fire('edit.activate', { element: label });

            expect(edit.isActive()).toBe(true);

            eventBus.fire('edit.complete');

            expect(edit.isActive()).toBe(false);
        });

        it('should initialize label at the correct position', () => {
            eventBus.fire('edit.activate', { element: label });

            eventBus.fire('edit.complete');

            const elementGfx = canvas.getChildren()[0].gfx;
            const span = elementGfx.getElementsByTagName('tspan')[0];

            expect(span.getAttribute('x')).toBe('8');
            expect(span.getAttribute('y')).toMatch('16');
        });
    });

});
