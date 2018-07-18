import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes } from '@angular/router';
import { JhiPaginationUtil, JhiResolvePagingParams } from 'ng-jhipster';
import { UserRouteAccessService } from 'app/core';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Receive } from 'app/shared/model/receive.model';
import { ReceiveService } from './receive.service';
import { ReceiveComponent } from './receive.component';
import { ReceiveDetailComponent } from './receive-detail.component';
import { ReceiveUpdateComponent } from './receive-update.component';
import { ReceiveDeletePopupComponent } from './receive-delete-dialog.component';
import { IReceive } from 'app/shared/model/receive.model';

@Injectable({ providedIn: 'root' })
export class ReceiveResolve implements Resolve<IReceive> {
    constructor(private service: ReceiveService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const id = route.params['id'] ? route.params['id'] : null;
        if (id) {
            return this.service.find(id).pipe(map((receive: HttpResponse<Receive>) => receive.body));
        }
        return of(new Receive());
    }
}

export const receiveRoute: Routes = [
    {
        path: 'receive',
        component: ReceiveComponent,
        resolve: {
            pagingParams: JhiResolvePagingParams
        },
        data: {
            authorities: ['ROLE_USER'],
            defaultSort: 'id,asc',
            pageTitle: 'Receives'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receive/:id/view',
        component: ReceiveDetailComponent,
        resolve: {
            receive: ReceiveResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receives'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receive/new',
        component: ReceiveUpdateComponent,
        resolve: {
            receive: ReceiveResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receives'
        },
        canActivate: [UserRouteAccessService]
    },
    {
        path: 'receive/:id/edit',
        component: ReceiveUpdateComponent,
        resolve: {
            receive: ReceiveResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receives'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const receivePopupRoute: Routes = [
    {
        path: 'receive/:id/delete',
        component: ReceiveDeletePopupComponent,
        resolve: {
            receive: ReceiveResolve
        },
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Receives'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
