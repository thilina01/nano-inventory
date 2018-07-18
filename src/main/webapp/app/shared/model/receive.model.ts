import { Moment } from 'moment';
import { IItem } from 'app/shared/model//item.model';

export interface IReceive {
    id?: number;
    receiveTime?: Moment;
    quantity?: number;
    item?: IItem;
}

export class Receive implements IReceive {
    constructor(public id?: number, public receiveTime?: Moment, public quantity?: number, public item?: IItem) {}
}
