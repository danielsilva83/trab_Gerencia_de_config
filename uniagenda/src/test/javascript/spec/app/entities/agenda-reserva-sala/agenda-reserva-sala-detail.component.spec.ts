import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AgendaTestModule } from '../../../test.module';
import { AgendaReservaSalaDetailComponent } from 'app/entities/agenda-reserva-sala/agenda-reserva-sala-detail.component';
import { AgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';

describe('Component Tests', () => {
  describe('AgendaReservaSala Management Detail Component', () => {
    let comp: AgendaReservaSalaDetailComponent;
    let fixture: ComponentFixture<AgendaReservaSalaDetailComponent>;
    const route = ({ data: of({ agendaReservaSala: new AgendaReservaSala(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaReservaSalaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AgendaReservaSalaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AgendaReservaSalaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load agendaReservaSala on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.agendaReservaSala).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
