export class ReimbursementStatus {
    statusid: number;
    status: string;

    constructor(statusid: number = 0, status: string = ' ') {
        this.statusid = statusid;
        this.status = status;
    }

}