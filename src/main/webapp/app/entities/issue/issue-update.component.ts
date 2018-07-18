import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { IIssue } from 'app/shared/model/issue.model';
import { IssueService } from './issue.service';
import { IItem } from 'app/shared/model/item.model';
import { ItemService } from 'app/entities/item';

@Component({
    selector: 'jhi-issue-update',
    templateUrl: './issue-update.component.html'
})
export class IssueUpdateComponent implements OnInit {
    private _issue: IIssue;
    isSaving: boolean;

    items: IItem[];
    issueTime: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private issueService: IssueService,
        private itemService: ItemService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ issue }) => {
            this.issue = issue;
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
        this.issue.issueTime = moment(this.issueTime, DATE_TIME_FORMAT);
        if (this.issue.id !== undefined) {
            this.subscribeToSaveResponse(this.issueService.update(this.issue));
        } else {
            this.subscribeToSaveResponse(this.issueService.create(this.issue));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IIssue>>) {
        result.subscribe((res: HttpResponse<IIssue>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get issue() {
        return this._issue;
    }

    set issue(issue: IIssue) {
        this._issue = issue;
        this.issueTime = moment(issue.issueTime).format(DATE_TIME_FORMAT);
    }
}
