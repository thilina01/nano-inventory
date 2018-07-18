/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { NanoInventoryTestModule } from '../../../test.module';
import { ReceiveUpdateComponent } from 'app/entities/receive/receive-update.component';
import { ReceiveService } from 'app/entities/receive/receive.service';
import { Receive } from 'app/shared/model/receive.model';

describe('Component Tests', () => {
    describe('Receive Management Update Component', () => {
        let comp: ReceiveUpdateComponent;
        let fixture: ComponentFixture<ReceiveUpdateComponent>;
        let service: ReceiveService;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NanoInventoryTestModule],
                declarations: [ReceiveUpdateComponent]
            })
                .overrideTemplate(ReceiveUpdateComponent, '')
                .compileComponents();

            fixture = TestBed.createComponent(ReceiveUpdateComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ReceiveService);
        });

        describe('save', () => {
            it(
                'Should call update service on save for existing entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Receive(123);
                    spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receive = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.update).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );

            it(
                'Should call create service on save for new entity',
                fakeAsync(() => {
                    // GIVEN
                    const entity = new Receive();
                    spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
                    comp.receive = entity;
                    // WHEN
                    comp.save();
                    tick(); // simulate async

                    // THEN
                    expect(service.create).toHaveBeenCalledWith(entity);
                    expect(comp.isSaving).toEqual(false);
                })
            );
        });
    });
});
