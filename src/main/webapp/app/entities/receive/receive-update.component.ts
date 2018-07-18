import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IReceive } from 'app/shared/model/receive.model';
import { ReceiveService } from './receive.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item';

@Component({
    selector: 'jhi-receive-update',
    templateUrl: './receive-update.component.html'
})
export class ReceiveUpdateComponent implements OnInit {
    private _receive: IReceive;
    isSaving: boolean;

    items: IItem[];
    receiveTime: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private receiveService: ReceiveService,
        private itemService: ItemService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ receive }) => {
            this.receive = receive;
        });
        this.itemService.query().subscribe(
            (res: HttpResponse<IItem[]>) => {
                this.items = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.receive.receiveTime = moment(this.receiveTime, DATE_TIME_FORMAT);
        if (this.receive.id !== undefined) {
            this.subscribeToSaveResponse(this.receiveService.update(this.receive));
        } else {
            this.subscribeToSaveResponse(this.receiveService.create(this.receive));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IReceive>>) {
        result.subscribe((res: HttpResponse<IReceive>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackItemById(index: number, item: IItem) {
        return item.id;
    }
    get receive() {
        return this._receive;
    }

    set receive(receive: IReceive) {
        this._receive = receive;
        this.receiveTime = moment(receive.receiveTime).format(DATE_TIME_FORMAT);
    }
}
