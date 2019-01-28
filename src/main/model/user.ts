import { Role } from './role';

export class User {
	userId: number;
	username: string;
	password: string;
	firstName: string;
	lastName: string;
	email: string;
	role: Role;


	constructor(userId: number = 0, username: string = '', password: string = '', firstName: string = '', lastName: string = '',
		email: string = '', role: Role) {
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.role = role;
	}
}