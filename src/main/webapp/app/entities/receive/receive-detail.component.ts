import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IReceive } from 'app/shared/model/receive.model';

@Component({
    selector: 'jhi-receive-detail',
    templateUrl: './receive-detail.component.html'
})
export class ReceiveDetailComponent implements OnInit {
    receive: IReceive;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ receive }) => {
            this.receive = receive;
        });
    }

    previousState() {
        window.history.back();
    }
}
