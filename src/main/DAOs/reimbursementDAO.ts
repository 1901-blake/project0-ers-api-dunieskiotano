import { Reimbursement } from '../model/reimbursement';
import { SessionFactory } from '../util/session-factory';

export class ReimbursementDAO {

    public async getAllReimbursements(): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * from reimbursement');
            const reimbursement = result.rows;
            return reimbursement.map(reimbursementsql => {
                return {
                    reimbursementid: reimbursementsql["reimbursementid"],
                    author: reimbursementsql["author"],
                    amount: reimbursementsql["amount"],
                    dateSubmitted: reimbursementsql["datesubmitted"],
                    dateResolved: reimbursementsql["dateresolved"],
                    description: reimbursementsql["description"],
                    resolver: reimbursementsql["resolver"],
                    status: reimbursementsql["status"],
                    type: reimbursementsql["type"]
                }
            })

        } finally {
            client.release();
        }
    }

    public async getReimbursementsByStatus(reimbursement_id: number): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query(`SELECT * from reimbursement where status=${reimbursement_id} ORDER BY datesubmitted`);
            const reimbursementsByStatus = result.rows;
            return reimbursementsByStatus.map(reimbursementsql => {
                return {
                    reimbursementid: reimbursementsql["reimbursementid"],
                    author: reimbursementsql["author"],
                    amount: reimbursementsql["amount"],
                    dateSubmitted: reimbursementsql["datesubmitted"],
                    dateResolved: reimbursementsql["dateresolved"],
                    description: reimbursementsql["description"],
                    resolver: reimbursementsql["resolver"],
                    status: reimbursementsql["status"],
                    type: reimbursementsql["type"]
                }
            })
        } finally {
            client.release();
        }
    }

    /**
     * GET REIMBURSEMENTS BY USER ID
     */
    public static async getReimbursementsByUserId(user_id: number): Promise<Reimbursement> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        try {
            const result = await client.query('SELECT * from reimbursement where author=$1', [user_id]);
            const reimbursement = result.rows;
            const reimbursementsql = reimbursement[0];
            if (reimbursementsql) {
                return {
                    reimbursementid: reimbursementsql["reimbursementid"],
                    author: reimbursementsql["author"],
                    amount: reimbursementsql["amount"],
                    dateSubmitted: reimbursementsql["datesubmitted"],
                    dateResolved: reimbursementsql["dateresolved"],
                    description: reimbursementsql["description"],
                    resolver: reimbursementsql["resolver"],
                    status: reimbursementsql["status"],
                    type: reimbursementsql["type"]
                }
            }
        } finally {
            client.release();
        }
    }

    //INSERT REIMBURSEMENTS IN THE TABLE REIMBURSEMENT 
    public async addReimbursements(author: number, amount: number, dateSubmitted: number,
        dateResolved: number, description: string, resolver: number, status: number,
        type: number) {
        let pool = SessionFactory.getConnectionPool();
        const text = `INSERT INTO reimbursement (author, amount, datesubmitted, dateresolved, description, resolver, status,
            "type") VALUES (${author}, ${amount}, ${dateSubmitted}, ${dateResolved}, 
                '${description}', ${resolver}, ${status}, ${type});`;
        try {
            const res = await pool.query(text);
            console.log(res.rows[0])

        } catch (err) {
            console.log(err.stack);
        }

    }


    //UDATE REIMBURSEMENTS --- TESTED => WORKING JUST FINE!!!!
    public static async updateReimbursement(reqBody): Promise<Reimbursement> {
        const client = await SessionFactory.getConnectionPool().connect();
        try {
            await client.query(
                'UPDATE reimbursement ' +
                `set author = ${reqBody.author}, ` +
                `amount  = ${reqBody.amount}, ` +
                `datesubmitted = ${reqBody.datesubmitted}, ` +
                `dateresolved = ${reqBody.dateresolved}, ` +
                `description = '${reqBody.description}', ` +
                `resolver=${reqBody.resolver}, ` +
                `status=${reqBody.status}, ` +
                `"type"=${reqBody.type} ` +
                ` WHERE reimbursementid = ${reqBody.reimbursementid};`
            );
        } finally {
            client.release();
            return this.getReimbursementsByUserId(reqBody.reimbursementid);
        }
    }
}
