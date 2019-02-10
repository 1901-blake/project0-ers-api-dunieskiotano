import {User} from '../models/user';
import{ReimbursementStatus} from '../models/reimbursement-status';
import {ReimbursementType} from '../models/reimbursement-type';
export class Reimbursement {
    reimbursementid: number;
    author: User;
    amount: number;
    dateSubmitted: number;
    dateResolved: number;
    description: string;
    resolver: number;
    status: ReimbursementStatus;
    type: ReimbursementType;

    constructor(reimbursementid: number=0, author: User, amount: number=0, dateSubmitted: number=0, dateResolved: number=0,
    description: string='', resolver: number=0, status: ReimbursementStatus, type: ReimbursementType){
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
