import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgendaTestModule } from '../../../test.module';
import { AgendaServidorComponent } from 'app/entities/agenda-servidor/agenda-servidor.component';
import { AgendaServidorService } from 'app/entities/agenda-servidor/agenda-servidor.service';
import { AgendaServidor } from 'app/shared/model/agenda-servidor.model';

describe('Component Tests', () => {
  describe('AgendaServidor Management Component', () => {
    let comp: AgendaServidorComponent;
    let fixture: ComponentFixture<AgendaServidorComponent>;
    let service: AgendaServidorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaServidorComponent],
      })
        .overrideTemplate(AgendaServidorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaServidorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaServidorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AgendaServidor(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.agendaServidors && comp.agendaServidors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
