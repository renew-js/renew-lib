import ImportModule from '../../../src/features/import';
import { Tester } from '../../Tester';

import trivialNet from './trivial_net.json';


describe('modules/importer - Importer', () => {
    let diagram;
    let importer;
    let jsonParser;
    let elementRegistry;

    beforeEach(() => {
        diagram = new Tester({ modules: [ ImportModule ] });
        importer = diagram.get('importer');
        jsonParser = diagram.get('jsonParser');
        elementRegistry = diagram.get('elementRegistry');
    });

    it('should be defined', () => {
        expect(importer).toBeDefined();
        expect(jsonParser).toBeDefined();
    });

    describe('Provider', () => {
        it('should import all elements', () => {
            const parsedData = jsonParser.parse(JSON.stringify(trivialNet));
            // console.log(parsedData);
            importer.import(parsedData);

            const shapes = elementRegistry.filter((element) => {
                return element.type === 'shape';
            });
            const connection = elementRegistry.filter((element) => {
                return element.type === 'connection';
            });

            expect(shapes.length).toBe(2);
            expect(connection.length).toBe(1);
        });
    });

    describe('Behaviors', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

        // it('should fire import', () => {
        //     expect(true).toBe(false);
        // });
    });
});
