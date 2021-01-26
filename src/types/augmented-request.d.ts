import { ApplicationService } from '../services/application/application.service';

declare module 'express-serve-static-core' {
    interface Request {
        applicationService: ApplicationService
    }
}
