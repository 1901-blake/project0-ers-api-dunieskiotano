import { Role } from './role';

export class User {
	userid: number;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;


	constructor(userid: number = 0, username: string = '', password: string = '', firstName: string = '', lastName: string = '',
		email: string = '', role: Role) {
		this.userid = userid;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.role = role;
	}
}