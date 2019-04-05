import ConnectModule from '../../../src/features/connect';
import { Tester } from '../../Tester';


describe('modules/connect - Connect', () => {
    let diagram;
    let connect;
    let shape1;
    let shape2;
    let canvas;

    beforeEach(() => {
        diagram = new Tester({ modules: [ ConnectModule ] });
        connect = diagram.get('connect');
        canvas = diagram.get('canvas');
        const elementFactory = diagram.get('elementFactory');

        shape1 = elementFactory.createShape({
            id: 'shape1', x: 100, y: 200, width: 300, height: 400,
        });
        shape2 = elementFactory.createShape({
            id: 'shape2', x: 500, y: 200, width: 300, height: 400,
        });

        canvas.addShape(shape1);
        canvas.addShape(shape2);
    });

    it('should be defined', () => expect(connect).toBeDefined());

    describe('Provider', () => {

    });

    describe('Behavior', () => {
        let eventBus;

        beforeEach(() => eventBus = diagram.get('eventBus'));

    });

});
