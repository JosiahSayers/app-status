import { Environment } from './environment';

describe('environment', () => {
    afterEach(() => process.env = {});

    it('returns the expected value for PORT when it\'s defined', () => {
        process.env.PORT = 'TEST PORT';
        expect(Environment.PORT).toBe('TEST PORT');
    });

    it('returns the "3000" for PORT when it\s falsy', () => {
        expect(Environment.PORT).toBe('3000');
    });

    it('returns the expected value for MONGO_CONN_STRING', () => {
        process.env.MONGO_CONN_STRING = 'TEST MONGO';
        expect(Environment.MONGO_CONN_STRING).toBe('TEST MONGO');
    });

    it('returns an empty string when MONGO_CONN_STRING is falsy', () => {
        expect(Environment.MONGO_CONN_STRING).toBe('');
    });
});
