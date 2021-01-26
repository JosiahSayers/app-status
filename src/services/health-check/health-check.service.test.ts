import { Response } from 'node-fetch';
import { ApplicationInterface } from '../../models/mongo/applications';
import { HealthCheckService } from './health-check.service';

describe('HealthCheckService', () => {
    jest.spyOn(global, 'Date').mockReturnValue(<any>{ toISOString: () => 'ISO DATE STRING' });
    const service = new HealthCheckService();
    let testApp: ApplicationInterface;

    beforeEach(() => {
        testApp = {
            id: 'TEST ID',
            name: 'NAME',
            url: 'EXTERNAL URL',
            expectedResponse: {
                httpStatus: 200
            },
            checkInterval: 100,
            statusChecks: []
        };
    });

    describe('checkAppWithResponse', () => {
        describe('when the call failed', () => {
            it('returns the expected object', () => {
                const res = <Response>{ ok: false };
                expect(service.checkAppWithResponse(testApp, res)).toEqual({
                    timestamp: 'ISO DATE STRING',
                    successful: false
                });
            });
        });

        describe('returns the expected object when the call is successful', () => {
            it('but no expectations are defined on the app', () => {
                testApp.expectedResponse = {};
                const res = <Response>{ ok: true };
                expect(service.checkAppWithResponse(testApp, res)).toEqual({
                    timestamp: 'ISO DATE STRING',
                    successful: false,
                    httpStatus: undefined
                });
            });

            it('and all checks pass', () => {
                const res = <Response>{ ok: true, status: 200 };
                expect(service.checkAppWithResponse(testApp, res)).toEqual({
                    timestamp: 'ISO DATE STRING',
                    successful: true,
                    httpStatus: true
                });
            });

            it('but the httpStatus check fails', () => {
                const res = <Response>{ ok: true, status: 204 };
                expect(service.checkAppWithResponse(testApp, res)).toEqual({
                    timestamp: 'ISO DATE STRING',
                    successful: false,
                    httpStatus: false
                });
            });
        });

    });
});
