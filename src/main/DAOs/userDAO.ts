import { User } from '../model/user';
import { SessionFactory } from '../util/session-factory';
import { ClientBase } from 'pg';
import { callbackify } from 'util';
import { RoleDAO } from '../DAOs/roleDAO';
import { Role } from '../model/role';





export class UserDAO {

    //THIS GETS ALL THE USERS -- FINANCIAL MANAGER AND ADMIN => WORKING JUST FINE
    public async getAllUsers(): Promise<User[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * FROM "user" AS u INNER JOIN "role" USING(roleid)');
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
                return {
                    userid: usersql['userid'],
                    username: usersql['username'],
                    password: usersql['password'],
                    firstName: usersql['firstname'],
                    lastName: usersql['lastname'],
                    email: usersql['email'],
                    role: {
                        role: usersql['role'],
                        roleid: usersql['userid']
                    }
                }
            }

        } finally {
            client.release();
        }
    }

    //UPDATES USERS BASED ON ID
    public static async updateUser(reqBody): Promise<User> {
        const client = await SessionFactory.getConnectionPool().connect();
        await client.query(
            'UPDATE "user" ' +
            `set username = '${reqBody.username}', ` +
            `"password" = '${reqBody.password}', ` +
            `firstname = '${reqBody.firstName}', ` +
            `lastname = '${reqBody.lastName}', ` +
            `"roleid" = ${reqBody.role} ` +
            `WHERE userid = ${reqBody.userid};`
        );
        client.release();
        return this.getAllUsersById(reqBody.userid);
    }

    //INSERT USERS IN THE TABLE "user" 
    public async addUsers(username: string, password: string, firstname: string, lastname: string,
        email: string, role: number) {
        let pool = SessionFactory.getConnectionPool();
        const text = `INSERT INTO "user" (username, "password", firstname, lastname, email, roleid) VALUES 
                     ('${username}', '${password}', '${firstname}', '${lastname}', '${email}', ${role});`;
        try {
            const res = await pool.query(text);
            console.log(res.rows[0])

        } catch (err) {
            console.log(err.stack);
        }

    }



}












