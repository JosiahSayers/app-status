import { main } from './index';

describe('index.ts', () => {
    describe('main', () => {
        it('returns true', () => {
            expect(main()).toBe(true);
        });
    });
});
