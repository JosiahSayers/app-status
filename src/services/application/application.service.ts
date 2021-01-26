import { ApplicationDocument, Applications } from '../../models/mongo/applications';
import { HealthCheckService } from '../health-check/health-check.service';
import { NetworkRequestService } from '../network-request/network-request.service';

export class ApplicationService {
    private applications: ApplicationDocument[];
    private appIintervalRefs: Map<string, NodeJS.Timeout>;
    private network: NetworkRequestService;
    private healthCheck: HealthCheckService;

    constructor() {
        this.network = new NetworkRequestService();
        this.healthCheck = new HealthCheckService();
        this.appIintervalRefs = new Map();
        Applications.find({}, (err, applications = []) => {
            this.applications = applications;
            this.setupIntervals();
        });
    }

    setupIntervals(): void {
        this.applications.forEach((app) => {
            this.appIintervalRefs.set(app.id, setInterval(() => this.checkApp(app), app.checkInterval));
        });
        this.checkApps();
    }

    async checkApps(): Promise<void> {
        for (const app of this.applications) {
            await this.checkApp(app);
        }
    }

    async checkApp(app: ApplicationDocument): Promise<void> {
        try {
            const req = this.network.fetchApp(app);
            const status = this.healthCheck.checkAppWithResponse(app, await req);
            app.statusChecks.push(status);
            await app.save();
        } catch (e) {
            console.log('Error checking application', e);
        }
    }
}
