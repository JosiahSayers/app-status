import { Response } from 'node-fetch';
import { ApplicationInterface, StatusCheck } from '../../models/mongo/applications';

export class HealthCheckService {
    checkAppWithResponse(app: ApplicationInterface, res: Response): StatusCheck {
        const timestamp = new Date().toISOString();
        const statusCheckDetails = res.ok ? this.doesAppPassChecks(app, res) : { successful: false };

        return { timestamp, ...statusCheckDetails };
    }

    private doesAppPassChecks(app: ApplicationInterface, res: Response): { successful: boolean } & Partial<StatusCheck> {
        let isHttpStatusValid: boolean;

        if (app.expectedResponse.httpStatus) {
            isHttpStatusValid = app.expectedResponse.httpStatus === res.status;
        }

        return { successful: !!isHttpStatusValid, httpStatus: isHttpStatusValid };
    }
}
