import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgendaTestModule } from '../../../test.module';
import { AgendaReservaSalaComponent } from 'app/entities/agenda-reserva-sala/agenda-reserva-sala.component';
import { AgendaReservaSalaService } from 'app/entities/agenda-reserva-sala/agenda-reserva-sala.service';
import { AgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';

describe('Component Tests', () => {
  describe('AgendaReservaSala Management Component', () => {
    let comp: AgendaReservaSalaComponent;
    let fixture: ComponentFixture<AgendaReservaSalaComponent>;
    let service: AgendaReservaSalaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaReservaSalaComponent],
      })
        .overrideTemplate(AgendaReservaSalaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaReservaSalaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaReservaSalaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AgendaReservaSala(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.agendaReservaSalas && comp.agendaReservaSalas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
