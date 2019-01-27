export class ReimbursementStatus {
    statusId: number;
    status: string;

    constructor(statusId: number = 0, status: string = ' ') {
        this.statusId = statusId;
        this.status = status;
    }

}