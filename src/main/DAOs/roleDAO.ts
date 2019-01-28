import { Role } from '../model/role';
import { SessionFactory } from '../util/session-factory';


export class RoleDAO {

    public async getAllRoles(): Promise<Role[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('SELECT * from "role"');
        let role = result.rows;
        client.release();
        return role;
    }



}