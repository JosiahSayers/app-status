import mongoose from 'mongoose';

export type ApplicationDocument = mongoose.Document & ApplicationInterface;

export interface ApplicationInterface {
    id: string;
    name: string;
    url: string;
    expectedResponse: ExpectedResponse;
    checkInterval: number;
    statusChecks: StatusCheck[]
}

export interface ExpectedResponse {
    httpStatus?: number;
}

export interface StatusCheck {
    timestamp: string;
    successful: boolean;
    httpStatus?: boolean;
}

const applicationSchema = new mongoose.Schema({
    name: String,
    url: String,
    internalUrl: String,
    expectedResponse: {
        httpStatus: Number
    },
    checkInterval: Number,
    statusChecks: Array
}, { timestamps: true });

export const Applications = mongoose.model<ApplicationDocument>('Applications', applicationSchema);
