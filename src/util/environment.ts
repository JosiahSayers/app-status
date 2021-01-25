export class Environment {
    static get PORT(): string {
        return process.env.PORT || '3000';
    }

    static get MONGO_CONN_STRING(): string {
        return process.env.MONGO_CONN_STRING || '';
    }
}
