export class Role {
    roleId: number;
    role: string;

    constructor(roleId: number = 0, role: string = '') {
        this.roleId = roleId;
        this.role = role;
    }
}