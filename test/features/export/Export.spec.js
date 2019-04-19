import ExportModule from '../../../src/features/export';
import { Tester } from '../../Tester';
import { TestPlugin } from '../../util/TestPlugin';


describe('modules/export - Export', () => {
    let diagram;
    let exporter;
    let jsonSerializer;
    let svgSerializer;
    let canvas;
    let shape1;
    let shape2;
    let connection1;

    beforeEach(() => {
        diagram = new Tester({ modules: [ ExportModule ] });
        exporter = diagram.get('exporter');
        jsonSerializer = diagram.get('jsonSerializer');
        svgSerializer = diagram.get('svgSerializer');
        canvas = diagram.get('canvas');
    });

    beforeEach(() => diagram.invoke(function (canvas, elementFactory) {
        shape1 = elementFactory.createShape({
            id: 'shape1', x: 108, y: 151, width: 40, height: 40,
        });
        shape2 = elementFactory.createShape({
            id: 'shape2', x: 216, y: 155, width: 48, height: 32,
        });
        connection1 = elementFactory.createConnection({
            id: 'connection1',
            waypoints: [ { x: 147, y: 171 }, { x: 217, y: 171 } ],
            source: shape1,
            target: shape2,
        });

        canvas.addShape(shape1);
        canvas.addShape(shape2);
        canvas.addConnection(connection1);
    }));

    it('should be defined', () => {
        expect(exporter).toBeDefined();
        expect(jsonSerializer).toBeDefined();
        expect(svgSerializer).toBeDefined();
    });

    describe('Providers', () => {
        let exportedData;

        beforeEach(() => exportedData = exporter.getExport());

        it('should export all elements', () => {
            expect(exportedData.elements.length).toBe(3);
        });

        it('should provide serialized payload and metadata', () => {
            const serializedData = jsonSerializer.serialize(exportedData);

            expect(serializedData.payload).toBeDefined();
            expect(serializedData.mimeType).toBeDefined();
            expect(serializedData.fileExtension).toBeDefined();
        });

        it('should serialze all elements', () => {
            const serializedData = jsonSerializer.serialize(exportedData);
            const parsedData = JSON.parse(serializedData.payload);

            expect(parsedData.elements.length).toBe(3);
        });

        it('should serialze all object references', () => {
            expect(exportedData.elements[2].parentId).toBe('__implicitroot');
            expect(exportedData.elements[2].sourceId).toBe('shape1');
            expect(exportedData.elements[2].targetId).toBe('shape2');
        });
    });

    describe('Behaviors', () => {
        let eventBus;
        let elementFactory;

        beforeEach(() => {
            eventBus = diagram.get('eventBus');
            elementFactory = diagram.get('elementFactory');
        });

        it('should fire export with serialized data', () => {
            let exportFired = false;

            eventBus.on('export', (context) => {
                if (context
                    && context.payload
                    && context.mimeType
                    && context.fileExtension) {
                    exportFired = true;
                }
            });

            eventBus.fire('export.json');

            expect(exportFired).toBe(true);
        });

        it('should include additional data', () => {
            let parsedData = {};

            eventBus.on('export', (context) => {
                parsedData = JSON.parse(context.payload);
            });

            eventBus.fire('export.json', {
                additionalData: {
                    foo: 'bar',
                },
            });

            expect(parsedData.foo).toBe('bar');
        });

        it('should fire meta export', () => {
            const testPlugin = new TestPlugin();
            let data = {};

            eventBus.fire('plugin.register', {
                plugin: testPlugin,
            });

            eventBus.on('export', (context) => {
                data = context;
            });

            eventBus.fire('export.meta', {
                model: 'test',
                format: 'test',
                additionalData: { foo: 'bar' },
            });

            expect(data.elements.length).toBe(3);
            expect(data.foo).toBe('bar');
        });

        it('should fire svg export', () => {
            const parser = new DOMParser();
            let doc = {};

            eventBus.on('export', (context) => {
                doc = parser.parseFromString(
                    context.payload,
                    context.mimeType
                );
            });

            eventBus.fire('export.svg');

            expect(doc.documentElement).toBeDefined();
            expect(doc.documentElement.nodeName).toBe('svg');
        });
    });
});
