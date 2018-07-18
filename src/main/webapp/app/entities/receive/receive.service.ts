import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_FORMAT } from 'app/shared/constants/input.constants';
import { map } from 'rxjs/operators';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared';
import { IReceive } from 'app/shared/model/receive.model';

type EntityResponseType = HttpResponse<IReceive>;
type EntityArrayResponseType = HttpResponse<IReceive[]>;

@Injectable({ providedIn: 'root' })
export class ReceiveService {
    private resourceUrl = SERVER_API_URL + 'api/receives';

    constructor(private http: HttpClient) {}

    create(receive: IReceive): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(receive);
        return this.http
            .post<IReceive>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    update(receive: IReceive): Observable<EntityResponseType> {
        const copy = this.convertDateFromClient(receive);
        return this.http
            .put<IReceive>(this.resourceUrl, copy, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http
            .get<IReceive>(`${this.resourceUrl}/${id}`, { observe: 'response' })
            .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
    }

    query(req?: any): Observable<EntityArrayResponseType> {
        const options = createRequestOption(req);
        return this.http
            .get<IReceive[]>(this.resourceUrl, { params: options, observe: 'response' })
            .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response' });
    }

    private convertDateFromClient(receive: IReceive): IReceive {
        const copy: IReceive = Object.assign({}, receive, {
            receiveTime: receive.receiveTime != null && receive.receiveTime.isValid() ? receive.receiveTime.toJSON() : null
        });
        return copy;
    }

    private convertDateFromServer(res: EntityResponseType): EntityResponseType {
        res.body.receiveTime = res.body.receiveTime != null ? moment(res.body.receiveTime) : null;
        return res;
    }

    private convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
        res.body.forEach((receive: IReceive) => {
            receive.receiveTime = receive.receiveTime != null ? moment(receive.receiveTime) : null;
        });
        return res;
    }
}
