import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    const date = moment().utc().format(); // get the current date
    this.id = this.id || uuidv4(); // if id is not provided, create a new one
    this.createdAt = this.createdAt || date; // if createdAt is not provided, create a new one
    this.updatedAt = date; // always update the updatedAt field
  }
}
