import fetch, { Response } from 'node-fetch';
import { ApplicationInterface } from '../../models/mongo/applications';

export class NetworkRequestService {
    fetchApp(app: ApplicationInterface): Promise<Response> {
        return fetch(`http://${app.url}`, {
            headers: {
                Host: app.url
            }
        }).catch((err) => err);
    }
}
