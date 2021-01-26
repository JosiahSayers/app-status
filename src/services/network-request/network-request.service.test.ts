import { ApplicationInterface } from '../../models/mongo/applications';
import { NetworkRequestService } from './network-request.service';
jest.mock('node-fetch');
import fetch from 'node-fetch';
import { mocked } from 'ts-jest/utils';

describe('NetworkRequestService', () => {
    const service = new NetworkRequestService();
    const mockFetch = mocked(fetch);
    const testApp = <ApplicationInterface><unknown>{ externalUrl: 'URL' };

    it('instantiates', () => expect(service).toBeDefined());

    describe('fetchApp', () => {
        it('returns the response from fetch', () => {
            mockFetch.mockImplementationOnce(() => Promise.resolve(<any>'RESPONSE'));
            expect(service.fetchApp(testApp)).resolves.toBe('RESPONSE');
        });

        it('catches any errors and returns the error', () => {
            mockFetch.mockImplementationOnce(() => Promise.reject(<any>'ERROR'));
            expect(service.fetchApp(testApp)).resolves.toBe('ERROR');
        });
    });
});
