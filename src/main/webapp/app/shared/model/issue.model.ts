import { Moment } from 'moment';
import { IItem } from 'app/shared/model//item.model';

export interface IIssue {
    id?: number;
    issueTime?: Moment;
    quantity?: number;
    deliveryNoteNumber?: string;
    item?: IItem;
}

export class Issue implements IIssue {
    constructor(
        public id?: number,
        public issueTime?: Moment,
        public quantity?: number,
        public deliveryNoteNumber?: string,
        public item?: IItem
    ) {}
}
