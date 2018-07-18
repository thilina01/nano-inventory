import { NgModule } from '@angular/core';

import { NanoInventorySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent } from './';

@NgModule({
    imports: [NanoInventorySharedLibsModule],
    declarations: [JhiAlertComponent, JhiAlertErrorComponent],
    exports: [NanoInventorySharedLibsModule, JhiAlertComponent, JhiAlertErrorComponent]
})
export class NanoInventorySharedCommonModule {}
