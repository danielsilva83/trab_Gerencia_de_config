import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgendaTestModule } from '../../../test.module';
import { AgendaAtendimentoServidorComponent } from 'app/entities/agenda-atendimento-servidor/agenda-atendimento-servidor.component';
import { AgendaAtendimentoServidorService } from 'app/entities/agenda-atendimento-servidor/agenda-atendimento-servidor.service';
import { AgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';

describe('Component Tests', () => {
  describe('AgendaAtendimentoServidor Management Component', () => {
    let comp: AgendaAtendimentoServidorComponent;
    let fixture: ComponentFixture<AgendaAtendimentoServidorComponent>;
    let service: AgendaAtendimentoServidorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaAtendimentoServidorComponent],
      })
        .overrideTemplate(AgendaAtendimentoServidorComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaAtendimentoServidorComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaAtendimentoServidorService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new AgendaAtendimentoServidor(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.agendaAtendimentoServidors && comp.agendaAtendimentoServidors[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
