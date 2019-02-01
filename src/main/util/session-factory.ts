import { Pool } from 'pg';
//SESSION FACTORY CREATED TO ESTABLISH CONNECTION WITH DATABASE
export class SessionFactory {
    static credentials = {
        database: process.env.PostgreSQLDB,
        host: process.env.PostgreSQLEndpoint,
        user: process.env.PostgreSQLUser,
        password: process.env.PostgreSQLPassword,
        max: 10
    }

    static pool: Pool;
    static created = false;

    static getConnectionPool(): Pool {
        if (!this.created) {
            this.pool = new Pool(this.credentials);
            this.created = true;
        }
        return this.pool;
    }
}