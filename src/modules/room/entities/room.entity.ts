import * as moment from 'moment';
import { v4 as uuidv4 } from 'uuid';
export class Room {
  id: string;
  title: string;
  description?: string;
  createdAt: string | Date;
  updatedAt: string | Date;
  deletedAt?: string | Date;
  constructor(partial: Partial<Room>) {
    Object.assign(this, partial);
    const date: string = moment.utc().format(); // get the current date
    this.id = this.id || uuidv4(); // if id is not provided, create a new one
    this.createdAt = moment(this.createdAt).format() || date; // if createdAt is not provided, create a new one
    this.updatedAt = date; // always update the updatedAt field
    this.deletedAt = this.deletedAt || null; // if deletedAt is not provided, set it to null
  }
}
