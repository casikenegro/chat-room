import { createId } from '@paralleldrive/cuid2';
import moment from 'moment';

export class User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
  updatedAt: string;
  constructor(partial: Partial<User>) {
    Object.assign(this, partial);
    this.id = this.id || createId(); // if id is not provided, create a new one
    this.createdAt = this.createdAt || moment.utc().format(); // if createdAt is not provided, create a new one
    this.updatedAt = moment.utc().format(); // always update the updatedAt field
  }
}
