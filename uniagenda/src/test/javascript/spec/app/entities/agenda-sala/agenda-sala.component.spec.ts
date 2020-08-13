import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgendaTestModule } from '../../../test.module';
import { AgendaSalaComponent } from 'app/entities/agenda-sala/agenda-sala.component';
import { AgendaSalaService } from 'app/entities/agenda-sala/agenda-sala.service';
import { AgendaSala } from 'app/shared/model/agenda-sala.model';

describe('Component Tests', () => {
  describe('AgendaSala Management Component', () => {
    let comp: AgendaSalaComponent;
    let fixture: ComponentFixture<AgendaSalaComponent>;
    let service: AgendaSalaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaSalaComponent],
      })
        .overrideTemplate(AgendaSalaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaSalaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaSalaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AgendaSala(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.agendaSalas && comp.agendaSalas[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
