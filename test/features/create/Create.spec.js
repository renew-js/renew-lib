import { Tester } from '../../Tester';
import CreateModule from '../../../src/features/create';

describe('modules/create - Create', () => {
    let diagram;

    beforeEach(() => {
        diagram = new Tester({
            modules: [
                CreateModule,
            ]
        });
    });

    it('should be defined', function () {
        diagram.invoke(function (create) {
            expect(create).toBeDefined();
        });
    });

    it('should create a shape', function () {
        diagram.invoke(function (create, elementFactory, commandStack, canvas) {
            const attributes = {
                id: 'shape-test-20583',
                type: 'Shape',
                businessObject: { },
                metaObject: { },
                width: 42,
                height: 42
            };

            expect(canvas._rootElement.children.length).toBe(0);

            commandStack.execute('tool.shape.create', {
                shape: elementFactory.createShape(attributes),
                position: { x: 50, y: 60, }
            });

            expect(canvas._rootElement.children.length).toBe(1);
        })
    });

});
