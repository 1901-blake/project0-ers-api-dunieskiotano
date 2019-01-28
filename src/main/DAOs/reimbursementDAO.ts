import { Reimbursement } from '../model/reimbursement';
import { SessionFactory } from '../util/session-factory';

export class ReimbursementDAO {

    public async getAllReimbursements(): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('SELECT * from reimbursement');

        const reimbursement = result.rows;
        const reimbursementData = [];
        reimbursement.forEach(rei => {
            reimbursementData.push(new Reimbursement(
                rei.reimbursementid,
                rei.author,
                rei.amount,
                rei.dateSubmitted,
                rei.dateResolved,
                rei.description,
                rei.resolver,
                rei.status,
                rei.type
            ));

        });

        return reimbursementData;


    }

    public async getReimbursementsByStatus(reimbursement_id: number): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query(`SELECT * from reimbursement where status=${reimbursement_id}`);
        const reimbursement = result.rows;
        const reimbursementData = [];
        reimbursement.forEach(rei => {
            reimbursementData.push(new Reimbursement(
                rei.reimbursementid,
                rei.author,
                rei.amount,
                rei.dateSubmitted,
                rei.dateResolved,
                rei.description,
                rei.resolver,
                rei.status,
                rei.type
            ));

        });

        return reimbursementData;


    }

    /**
     * Reimbursements by user id
     */
    public async getReimbursementsByUserId(user_id: number): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query(`SELECT * from reimbursement where author=${user_id}`);
        const reimbursement = result.rows;
        const reimbursementData = [];
        reimbursement.forEach(rei => {
            reimbursementData.push(new Reimbursement(
                rei.reimbursementid,
                rei.author,
                rei.amount,
                rei.dateSubmitted,
                rei.dateResolved,
                rei.description,
                rei.resolver,
                rei.status,
                rei.type
            ));

        });

        return reimbursementData;


    }

    public async addReimbursements(author: number, amount: number, dateSubmitted: number,
        dateResolved: number, description: string, resolver: number, status: number,
        type: number) {
        let pool = SessionFactory.getConnectionPool();
        //console.log(reimbursementid, amount, author, description, resolver);
        //const client = await pool.connect();
        
        // const text = `INSERT INTO reimbursement (author, amount, dateSubmitted, dateResolved, description, resolver, status,
        //    "type") VALUES (${author}, ${amount}, ${dateSubmitted}, ${dateResolved}, 
        //               '${description}', ${resolver}, ${status}, ${type});`;
        const text = `INSERT INTO reimbursement (author, amount, dateSubmitted, dateResolved, description, resolver, status,
            "type") VALUES (${author}, ${amount}, ${dateSubmitted}, ${dateResolved}, 
                '${description}', ${resolver}, ${status}, ${type});`;
        try {
            console.log('-----1------')
            const res = await pool.query(text);
            console.log(res.rows[0])
        } catch (err) {
            console.log(err.stack);
        }

    }
}
