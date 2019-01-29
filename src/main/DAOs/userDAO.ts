import { User } from '../model/user';
import { SessionFactory } from '../util/session-factory';
import { ClientBase } from 'pg';
import { callbackify } from 'util';
import { RoleDAO } from '../DAOs/roleDAO';





export class UserDAO {

    //THIS GETS ALL THE USERS -- FINANCIAL MANAGER AND ADMIN => WORKING JUST FINE
    public async getAllUsers(): Promise<User[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('SELECT * FROM "user" AS u INNER JOIN "role"  AS r ON u.userid=r.roleid;');
        const user = result.rows;
        user.forEach(u => {
            u.userid,
                u.username,
                u.password,
                u.firstname,
                u.lastname,
                u.email,
                u.role,
                u.roleid

        })
        client.release();
        return user;


    }

    //GETS ALL USERS BY ID
    public static async getAllUsersById(userid: number): Promise<any> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query(`
        SELECT userId, username, "password", firstname, lastname, email,"role" from "user" where userId=${userid}`
        );
        const user = result.rows;
            user.forEach(ui => {
            ui.userid,
                ui.username,
                ui.password,
                ui.firstname,
                ui.lastname,
                ui.email,
                ui.role,
                ui.roleid

        })

        client.release();
        return user;
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
            `"role" = ${reqBody.role} ` +
            `WHERE userid = ${reqBody.userId};`
        );
        client.release();
        return this.getAllUsersById(reqBody.userId);
    }

    //INSERT USERS IN THE TABLE "user" 
    public async addUsers(username: string, password: string, firstname: string, lastname: string,
        email: string, role: number) {
        let pool = SessionFactory.getConnectionPool();
        const text = `INSERT INTO "user" (username, "password", firstname, lastname, email, "role") VALUES 
                     ('${username}', '${password}', '${firstname}', '${lastname}', '${email}', ${role});`;
        try {
            const res = await pool.query(text);
            console.log(res.rows[0])

        } catch (err) {
            console.log(err.stack);
        }

    }



}












