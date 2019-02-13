import { User } from '../models/user';
import { SessionFactory } from '../util/session-factory';
import { ClientBase } from 'pg';
import { callbackify } from 'util';
import { RoleDAO } from '../DAOs/roleDAO';
import { Role } from '../models/role';


export class UserDAO {

    //THIS GETS ALL THE USERS -- FINANCIAL MANAGER AND ADMIN => WORKING JUST FINE
    public static async getAllUsers(): Promise<User[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM "user" INNER JOIN "role" USING(roleid) ORDER BY "user".userid');
            return result.rows.map(user => {
                return {
                    userid: user["userid"],
                    username: user["username"],
                    password: user["password"],
                    firstName: user["firstname"],
                    lastName: user["lastname"],
                    email: user["email"],
                    role: {
                        roleId: user["roleid"],
                        role: user["role"]
                    }

                }
            })
        } finally {
            client.release();
        }
    }

    //GETS ALL USERS BY ID
    public static async getAllUsersById(userid: number): Promise<any> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM "user" JOIN "role" USING(roleid) WHERE "user".userid=$1', [userid]);
            const users = result.rows;
            const usersql = users[0];
            if (usersql) {
                return new User(
                    usersql['userid'],
                    usersql['username'],
                    usersql['password'],
                    usersql['firstname'],
                    usersql['lastname'],
                    usersql['email'],
                    new Role(
                        usersql['roleid'],
                        usersql['role']
                    )
                )
            }

        } finally {
            client.release();
        }
    }

    //UPDATES USERS BASED ON ID
    public static async updateUser(user: User): Promise<User> {
        try {

            const client = await SessionFactory.getConnectionPool().connect();
            await client.query(`UPDATE "user" SET username=$1, password=$2, firstname=$3, lastname=$4, 
                               email=$5, roleid=$6 WHERE userid=$7 RETURNING *`,
                [user.username, user.password, user.firstName, user.lastName, user.email,
                user.role.roleId, user.userid]);
                
            client.release();
        } finally {
            return this.getAllUsersById(user.userid);
        }
    }

    //INSERT USERS IN THE TABLE "user" 
    public static async createUsers(user: User): Promise<User> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query(`INSERT INTO "user" (username, "password", firstname, lastname, email, roleid) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
                [user.username, user.password, user.firstName, user.lastName, user.email, user.role]);
            return result.rows[0];
        } finally {
            client.release(); // releases connection
        }

    }

    public static async deleteUser(userid: number): Promise<User> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query(`DELETE FROM "user" WHERE userid=$1`, [userid]);
            return result.rows[0];

        } finally {
            client.release();
        }



    }

}
