import { Tester } from '../../Tester';
import PointerModule from '../../../src/features/pointer';
import EditModule from '../../../src/features/edit';
import { TestFactory } from '../../util/TestFactory';


describe('modules/pointer - Pointer', () => {
    let diagram;
    let pointer;
    let canvas;
    let factory;

    let shape;
    let label;
    let connection;

    beforeEach(() => {
        diagram = new Tester({ modules: [ PointerModule, EditModule ] });
        pointer = diagram.get('pointer');
        canvas = diagram.get('canvas');
        factory = new TestFactory();

        shape = factory.createShape(60, 30);
        label = factory.createLabel('test', { x: 50, y: 70, });
        connection = factory.createConnection(
            { x: 10, y: 80 },
            { x: 52, y: 13 },
        );
    });

    it('should be defined', () => expect(pointer).toBeDefined());

    describe('Provider', () => {

    });

    describe('Tool', () => {
        let toolbox;

        beforeEach(() => {
            toolbox = diagram.get('toolbox');
            toolbox.activate('pointer');
        });

        it('should activate edit on doubleClick on label', function () {
            const event = { element: label, originalEvent: { } };

            toolbox.onDoubleClick(event);

            expect(toolbox.activeTool.type).toBe('edit');
        });

        it('should not activate edit on doubleClick on label', function () {
            toolbox.onDoubleClick({ element: shape, originalEvent: { } });

            expect(toolbox.activeTool.type).not.toBe('edit');

            toolbox.onDoubleClick({ element: connection, originalEvent: { } });

            expect(toolbox.activeTool.type).not.toBe('edit');
        });

        it('should reset the cursor after resize', function () {
            document.body.style.cursor = 'nesw-resize';

            toolbox.activeTool.isResizing = true;
            toolbox.activeTool.onMouseUp({});

            expect(document.body.style.cursor).toBe('default');
        });

    });

});
