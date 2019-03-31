import ImportModule from '../../../src/features/import';
import { Tester } from '../../Tester';

import trivialNet from './trivial_net.json';


describe('modules/import - Import', () => {
    let diagram;
    let importer;
    let jsonParser;
    let elementRegistry;
    let canvas;

    beforeEach(() => {
        diagram = new Tester({ modules: [ ImportModule ] });
        importer = diagram.get('importer');
        jsonParser = diagram.get('jsonParser');
        elementRegistry = diagram.get('elementRegistry');
        canvas = diagram.get('canvas');
    });

    it('should be defined', () => {
        expect(importer).toBeDefined();
        expect(jsonParser).toBeDefined();
    });

    describe('Providers', () => {
        let parsedData;

        beforeEach(() => {
            parsedData = jsonParser.parse(JSON.stringify(trivialNet));
        });

        it('should require elements', () => {
            const importError = new Error('Import must contain elements.');

            expect(() => importer.import({}).toThrow(importError));
        });

        it('should import all elements', () => {
            importer.import(parsedData);

            const shapes = elementRegistry.filter((element) => {
                return element.type === 'shape';
            });
            const connections = elementRegistry.filter((element) => {
                return element.type === 'connection';
            });

            expect(shapes.length).toBe(2);
            expect(connections.length).toBe(1);
        });

        it('should draw the elements', () => {
            importer.import(parsedData);

            expect(canvas.getDefaultLayer().children.length).toBe(3);
        });
    });

    describe('Behaviors', () => {
        let eventBus;
        let elementFactory;

        beforeEach(() => {
            eventBus = diagram.get('eventBus');
            elementFactory = diagram.get('elementFactory');
        });

        it('should clear the canvas', () => {
            const shape = elementFactory.createShape({
                id: 'shape-test-20583',
                type: 'Shape',
                x: 100,
                y: 100,
                width: 42,
                height: 42,
            });
            canvas.addShape(shape);

            expect(canvas.getDefaultLayer().children.length).toBe(1);

            eventBus.fire('import.start', {});

            expect(canvas.getDefaultLayer().children.length).toBe(0);
        });

        it('should fire import with parsed data', () => {
            let fired = false;
            eventBus.on('import', (context) => {
                if (context
                    && context.data
                    && context.data.elements
                    && context.data.elements.length) {
                    fired = true;
                }
            });

            eventBus.fire('import.json', { data: JSON.stringify(trivialNet) });

            expect(fired).toBe(true);
        });
    });
});
