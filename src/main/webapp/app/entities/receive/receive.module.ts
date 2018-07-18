import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NanoInventorySharedModule } from 'app/shared';
import {
    ReceiveComponent,
    ReceiveDetailComponent,
    ReceiveUpdateComponent,
    ReceiveDeletePopupComponent,
    ReceiveDeleteDialogComponent,
    receiveRoute,
    receivePopupRoute
} from './';

const ENTITY_STATES = [...receiveRoute, ...receivePopupRoute];

@NgModule({
    imports: [NanoInventorySharedModule, RouterModule.forChild(ENTITY_STATES)],
    declarations: [
        ReceiveComponent,
        ReceiveDetailComponent,
        ReceiveUpdateComponent,
        ReceiveDeleteDialogComponent,
        ReceiveDeletePopupComponent
    ],
    entryComponents: [ReceiveComponent, ReceiveUpdateComponent, ReceiveDeleteDialogComponent, ReceiveDeletePopupComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NanoInventoryReceiveModule {}
