import { ReimbursementStatus } from '../model/reimbursement-status';
import { SessionFactory } from '../util/session-factory';
import { UserDAO } from './userDAO';
import { Reimbursement } from '../model/reimbursement';


export class ReimbursementStatusDAO {

    public async getAllReimbursementStatuses(): Promise<ReimbursementStatus[]> {
        let pool = SessionFactory.getConnectionPool();
        const client = await pool.connect();
        const result = await client.query('SELECT * from reimbursementstatus');

        const reimbursementStatus = result.rows;
        const reimbursementStatusData = [];
        reimbursementStatus.forEach(reiStatus => {
            reimbursementStatusData.push(new ReimbursementStatus(
                reiStatus.statusid,
                reiStatus.status
            ));

        });

        return reimbursementStatusData;


    }
}
    