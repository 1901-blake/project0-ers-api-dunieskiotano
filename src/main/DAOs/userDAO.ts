import { User } from '../model/user';
import { SessionFactory } from '../util/session-factory';
import { Role } from '../model/role';

export class UserDAO {

    public async getAllUsers(): Promise<User[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('SELECT * from "user"');

        const user = result.rows;
        const userData = [];
        user.forEach(u => {
            userData.push(new User(
                u.userid,
                u.username,
                u.password,
                u.firstname,
                u.lastname,
                u.email,
                new Role(u.role, 'testrole')
            ));

        });
        return userData;


    }
}
