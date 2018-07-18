/* tslint:disable max-line-length */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { NanoInventoryTestModule } from '../../../test.module';
import { ReceiveDetailComponent } from 'app/entities/receive/receive-detail.component';
import { Receive } from 'app/shared/model/receive.model';

describe('Component Tests', () => {
    describe('Receive Management Detail Component', () => {
        let comp: ReceiveDetailComponent;
        let fixture: ComponentFixture<ReceiveDetailComponent>;
        const route = ({ data: of({ receive: new Receive(123) }) } as any) as ActivatedRoute;

        beforeEach(() => {
            TestBed.configureTestingModule({
                imports: [NanoInventoryTestModule],
                declarations: [ReceiveDetailComponent],
                providers: [{ provide: ActivatedRoute, useValue: route }]
            })
                .overrideTemplate(ReceiveDetailComponent, '')
                .compileComponents();
            fixture = TestBed.createComponent(ReceiveDetailComponent);
            comp = fixture.componentInstance;
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(comp.receive).toEqual(jasmine.objectContaining({ id: 123 }));
            });
        });
    });
});
