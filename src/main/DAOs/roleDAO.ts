import { Role } from '../models/role';
import { SessionFactory } from '../util/session-factory';


export class RoleDAO {

    public async getAllRoles(): Promise<Role[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('SELECT * from "role"');
        let role = result.rows;
        return role.map(e => {
            return new Role(e.role, e.roleid)
        });

    }



}