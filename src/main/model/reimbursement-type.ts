export class ReimbursementType {
    typeId: number;
    type: string;

    constructor(typeId: number = 0, type: string = '') {
        this.typeId = typeId;
        this.type = type;
    }

}