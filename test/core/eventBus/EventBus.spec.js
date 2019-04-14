import { Tester } from '../../Tester';
import EventBusModule from '../../../src/core/eventBus';


describe('modules/eventBus - EventBus', () => {
    let diagram;
    let eventBus;

    beforeEach(() => {
        diagram = new Tester({ modules: [ EventBusModule ] });
        eventBus = diagram.get('eventBus');
    });

    it('should be defined', () => expect(eventBus).toBeDefined());

    describe('Provider', () => {

        it('should fire an event that does not exist', () => {
            expect(() => eventBus.fire('does')).not.toThrowError();
            expect(() => eventBus.fire('does.not')).not.toThrowError();
            expect(() => eventBus.fire('does.not.exist')).not.toThrowError();
            expect(() => eventBus.fire('does.not.exist.!')).not.toThrowError();
        });

    });

});
