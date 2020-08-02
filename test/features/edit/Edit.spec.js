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

        it('should should not be empty', function () {
            const textBox = edit.directEditing._textbox;
            const editingContent = textBox.parent.firstChild;

            expect(editingContent.innerHTML).toEqual('');

            edit.focus();

            expect(editingContent.innerHTML).not.toEqual('');
        });

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        it('should activate direct editing', () => {
            const context = { element: label };

            eventBus.fire('edit.activate', context);

            expect(edit.isActive()).toBe(true);

            eventBus.fire('edit.complete', context);

            expect(edit.isActive()).toBe(false);
        });

        it('should initialize label at the correct position', () => {
            const context = { element: label };

            eventBus.fire('edit.activate', context);

            eventBus.fire('edit.complete', context);

            const elementGfx = canvas.getChildren()[0].gfx;
            const span = elementGfx.getElementsByTagName('tspan')[0];

            expect(span.getAttribute('x')).toBe('10');
            expect(span.getAttribute('y')).toBe('13.5');
        });
    });

    describe('Tool', () => {
        let toolbox;

        beforeEach(() => {
            toolbox = diagram.get('toolbox');
            toolbox.activate('edit', { label });
        });

        it('should be activated', function () {
            expect(edit.isActive()).toBe(true);
        });

    });

});
