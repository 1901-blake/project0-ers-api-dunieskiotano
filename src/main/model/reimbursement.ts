export class Reimbursement {
    reimbursementid: number;
    author: number;
    amount: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status: number;
    type: number;

    constructor(reimbursementid: number=0, author: number=0, amount: number=0, dateSubmitted: number=0, dateResolved: number=0,
    description: string='', resolver: number=0, status: number=0, type: number=0){
        this.reimbursementid=reimbursementid;
        this.author=author;
        this.amount=amount;
        this.dateSubmitted=dateSubmitted;
        this.dateResolved=dateResolved;
        this.description=description;
        this.resolver=resolver;
        this.status=status;
        this.type=type;
    }
}
