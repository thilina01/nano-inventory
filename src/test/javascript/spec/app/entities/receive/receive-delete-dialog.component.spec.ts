/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { NanoInventoryTestModule } from '../../../test.module';
import { ReceiveDeleteDialogComponent } from 'app/entities/receive/receive-delete-dialog.component';
import { ReceiveService } from 'app/entities/receive/receive.service';

describe('Component Tests', () => {
    describe('Receive Management Delete Component', () => {
        let comp: ReceiveDeleteDialogComponent;
        let fixture: ComponentFixture<ReceiveDeleteDialogComponent>;
        let service: ReceiveService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NanoInventoryTestModule],
                declarations: [ReceiveDeleteDialogComponent]
            })
                .overrideTemplate(ReceiveDeleteDialogComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiveDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiveService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete', inject(
                [],
                fakeAsync(() => {
                    // GIVEN
                    spyOn(service, 'delete').and.returnValue(of({}));

                    // WHEN
                    comp.confirmDelete(123);
                    tick();

                    // THEN
                    expect(service.delete).toHaveBeenCalledWith(123);
                    expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                })
            ));
        });
    });
});
