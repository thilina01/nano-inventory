import { IReceive } from 'app/shared/model//receive.model';
import { IIssue } from 'app/shared/model//issue.model';

export interface IItem {
    id?: number;
    code?: string;
    description?: string;
    quantity?: number;
    receives?: IReceive[];
    issues?: IIssue[];
}

export class Item implements IItem {
    constructor(
        public id?: number,
        public code?: string,
        public description?: string,
        public quantity?: number,
        public receives?: IReceive[],
        public issues?: IIssue[]
    ) {}
}
