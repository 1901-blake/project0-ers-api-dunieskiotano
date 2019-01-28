import {Role} from '../model/role';
import {SessionFactory} from '../util/session-factory';

export class RoleDAO {

    public async getAllRoles(): Promise<Role[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('SELECT * from "role"');

        const role = result.rows;
        const roleData = [];
        role.forEach(r => {
            roleData.push(new Role(
                r.roleid,
                r.role
            ));

        });
        
        return roleData;


    }
}