import { Reimbursement } from '../model/reimbursement';
import { SessionFactory } from '../util/session-factory';

export class ReimbursementDAO {

    public async getAllReimbursements(): Promise<Reimbursement[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('SELECT * from reimbursement');
        const reimbursement = result.rows;
        reimbursement.forEach(rei => {
            rei.reimbursementid,
                rei.author,
                rei.amount,
                rei.dateSubmitted,
                rei.dateResolved,
                rei.description,
                rei.resolver,
                rei.status,
                rei.type
        });
        client.release();
        return reimbursement;


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
        client.release();
        return reimbursementData;
    }

    /**
     * GET REIMBURSEMENTS BY USER ID
     */
    public static async getReimbursementsByUserId(user_id: number): Promise<any> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query(`SELECT * from reimbursement where author=${user_id}`);
        const reimbursement = result.rows;
        
        reimbursement.forEach(rei => {
           
                rei.reimbursementid,
                rei.author,
                rei.amount,
                rei.dateSubmitted,
                rei.dateResolved,
                rei.description,
                rei.resolver,
                rei.status,
                rei.type
            

        });
        client.release();
        return reimbursement;


    }

    //INSERT REIMBURSEMENTS IN THE TABLE REIMBURSEMENT 
    public async addReimbursements(author: number, amount: number, dateSubmitted: number,
        dateResolved: number, description: string, resolver: number, status: number,
        type: number) {
        let pool = SessionFactory.getConnectionPool();
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


    //UDATE REIMBURSEMENTS --- TESTED => WORKING JUST FINE!!!!
    public static async updateReimbursement(reqBody): Promise<Reimbursement> {
        const client = await SessionFactory.getConnectionPool().connect();
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

        client.release();
        return this.getReimbursementsByUserId(reqBody.reimbursementid);
    }
}
