import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { NanoInventoryItemModule } from './item/item.module';
import { NanoInventoryReceiveModule } from './receive/receive.module';
import { NanoInventoryIssueModule } from './issue/issue.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    // prettier-ignore
    imports: [
        NanoInventoryItemModule,
        NanoInventoryReceiveModule,
        NanoInventoryIssueModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class NanoInventoryEntityModule {}
