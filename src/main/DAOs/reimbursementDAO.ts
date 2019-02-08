import { Reimbursement } from '../models/reimbursement';
import { SessionFactory } from '../util/session-factory';
import { Client } from 'pg';;


export class ReimbursementDAO {


    //Gets all the reimbursements from the DB
    public static async getAllReimbursements(): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const query = ['select * from reimbursement as reimb inner join "user" as u on reimb.author=u.userid',
            'inner join reimbursementstatus as rs on reimb.status=rs.statusid',
            'inner join reimbursementtype as rt on reimb."type"=rt.typeid;'].join(" ");
        try {
            const result = await client.query(query);
            const reimbursement = this.mapData(result.rows);
            return reimbursement;
        } finally {
            client.release();
        }
    }

    //Gets all the reimbursements By Status from the DB
    public static async getReimbursementsByStatus(status: number): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query(`SELECT * from reimbursement where status=$1 ORDER BY datesubmitted`,
                [status]);
            const reimbursement = this.mapData(result.rows);
            return reimbursement;
        } finally {
            client.release();
        }
    }

    /**
     * Gets all the reimbursements by user id
     */
    public static async getReimbursementsByUserId(user_id: number): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * from reimbursement where author=$1', [user_id]);
            const reimbursement = this.mapData(result.rows);
            //let reimbursementsql = reimbursement[0];
            return reimbursement;
        }
        finally {
            client.release();
        }
    }

    //INSERT REIMBURSEMENTS IN THE TABLE REIMBURSEMENT 
    public static async submitReimbursement(reimbursement: Reimbursement): Promise<Reimbursement> {
        const pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query(
                `INSERT INTO reimbursement (author, amount, datesubmitted,
                dateresolved, description, resolver, status, "type")
              VALUES  ($1, $2, $3, $4, $5, $6, $7, $8)
              RETURNING *`,
                [reimbursement.author, reimbursement.amount, Math.floor(Date.now() / 1000),
                    0, reimbursement.description, reimbursement.resolver, reimbursement.status, reimbursement.type]
            );
            return result.rows[0];

        } finally {
            client.release(); // release connection
        }
    }


    //UDATE REIMBURSEMENTS --- TESTED => WORKING JUST FINE!!!!
    public static async updateReimbursement(reqBody): Promise<Reimbursement[]> {
        const client = await SessionFactory.getConnectionPool().connect();
        let dateSubmitted = this.convertDateToUnixTime(reqBody.dateSubmitted);
        let dateResolved;
        if (reqBody.dateresolved === 0) {
            dateResolved = 0;
        }
        else {
            dateResolved = this.convertDateToUnixTime(reqBody.dateResolved);
        }

        try {
            await client.query(
                'UPDATE reimbursement ' +
                `set author = ${reqBody.author}, ` +
                `amount  = ${reqBody.amount}, ` +
                `datesubmitted = ${dateSubmitted}, ` +
                `dateresolved = ${dateResolved}, ` +
                `description = '${reqBody.description}', ` +
                `resolver=${reqBody.resolver}, ` +
                `status=${reqBody.status}, ` +
                `"type"=${reqBody.type} ` +
                ` WHERE reimbursementid = ${reqBody.reimbursementid};`
            );

            return this.getReimbursementsByUserId(reqBody.reimbursementid);
        } finally {
            client.release();

        }
    }

    public static mapData(reimbursement): Promise<Reimbursement[]> {
        return reimbursement.map(rei => {
            let dateS = this.convertUnixTimeToDate(rei['datesubmitted']);
            let dateR = rei['dateresolved'];
            if (dateR === 0) {
                dateR = 0;
            }
            else {
                dateR = this.convertUnixTimeToDate(rei['dateresolved'])
            }
            return {
                reimbursementid: rei['reimbursementid'],
                author: rei['author'],
                "first name": rei['firstname'],
                "last name": rei['lastname'],
                "email": rei['email'],
                amount: rei['amount'],
                dateSubmitted: dateS,
                dateResolved: dateR,
                description: rei['description'],
                resolver: rei['resolver'],
                status: rei['status'],
                statuid: rei['statusid'],
                type: rei['type'],
                typeid: rei['typeid']
            }
        }
        )

    }
    public static convertUnixTimeToDate(dateData: number): string {
        let date = new Date(1970, 0, 1);
        date.setSeconds(dateData);
        return date.toDateString();
    }
    public static convertDateToUnixTime(dateData: Date): number {
        let date = new Date(dateData);
        let unixTimeStamp = Math.floor(date.getTime() / 1000);
        return unixTimeStamp;

    }


}
