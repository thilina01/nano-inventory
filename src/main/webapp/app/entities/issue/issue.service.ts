import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IIssue } from 'app/shared/model/issue.model';

type EntityResponseType = HttpResponse<IIssue>;
type EntityArrayResponseType = HttpResponse<IIssue[]>;

@Injectable({ providedIn: 'root' })
export class IssueService {
    private resourceUrl = SERVER_API_URL + 'api/issues';

    constructor(private http: HttpClient) {}

    create(issue: IIssue): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(issue);
        return this.http
            .post<IIssue>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(issue: IIssue): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(issue);
        return this.http
            .put<IIssue>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IIssue>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IIssue[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(issue: IIssue): IIssue {
        const copy: IIssue = Object.assign({}, issue, {
            issueTime: issue.issueTime != null && issue.issueTime.isValid() ? issue.issueTime.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.issueTime = res.body.issueTime != null ? moment(res.body.issueTime) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((issue: IIssue) => {
            issue.issueTime = issue.issueTime != null ? moment(issue.issueTime) : null;
        });
        return res;
    }
}
