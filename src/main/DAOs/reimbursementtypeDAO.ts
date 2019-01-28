import {ReimbursementType} from '../model/reimbursement-type';
import {SessionFactory} from '../util/session-factory';

export class ReimbursementTypeDAO {

    public async getAllReimbursementTypes(): Promise<ReimbursementType[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('SELECT * from reimbursementtype');

        const reimbursementType = result.rows;
        const reimbursementTypeData = [];
        reimbursementType.forEach(reiType => {
            reimbursementTypeData.push(new ReimbursementType(
                reiType.typeid,
                reiType.type
            ));

        });
        
        return reimbursementTypeData;


    }
}