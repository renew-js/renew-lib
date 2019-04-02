import Simulator from '../../src/Simulator';


describe('instances - Simulator', () => {
    let simulator;

    beforeEach(() => {
        simulator = new Simulator();
    });

    it('should be defined', function () {
        expect(simulator).toBeDefined();
    });
});
