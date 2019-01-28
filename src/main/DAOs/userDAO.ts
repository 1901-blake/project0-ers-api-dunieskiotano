import { User } from '../model/user';
import { SessionFactory } from '../util/session-factory';
import { ClientBase } from 'pg';
import { callbackify } from 'util';
import { RoleDAO } from '../DAOs/roleDAO';
import { Role } from '../model/role';
import session from 'express-session';




export class UserDAO {

    //THIS GETS ALL THE USERS -- FINANCIAL MANAGER AND ADMIN => WORKING JUST FINE
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
                u.role
            ));

        });

        return userData;


    }

    public static async getAllUsersById(userid: number): Promise<any> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query(`
        SELECT userId, username, "password", firstname, lastname, email,"role" from "user" where userId=${userid}`
        );
        const user = result.rows;
        const userInfo = [];
        user.forEach(ui => {
            userInfo.push(
                ui.userid,
                ui.username,
                ui.password,
                ui.firstname,
                ui.lastname,
                ui.email,
                ui.role
            )
        })


        return userInfo;
    }


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



}












