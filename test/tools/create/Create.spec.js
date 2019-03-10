import { Tester } from '../../Tester';
import CreateModule from '../../../src/features/create';

describe('modules/create - Create', () => {
    let diagram;

    beforeAll(() => {
        diagram = new Tester({
            modules: [
                CreateModule,
            ]
        });
    });

    it('should be defined', function () {
        diagram.invoke((create) => {
            expect(create).toBeDefined();
        })
    });

    it('should create a shape', function () {
        diagram.invoke((create) => {
            expect(create).toBeDefined();
        })
    });

    it('should create a connection', () => {

    });

    it('should create a text', () => {

    });

    describe('Behavior', () => {

    })
});
