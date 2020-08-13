import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AgendaTestModule } from '../../../test.module';
import { AgendaAtendimentoServidorDetailComponent } from 'app/entities/agenda-atendimento-servidor/agenda-atendimento-servidor-detail.component';
import { AgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';

describe('Component Tests', () => {
  describe('AgendaAtendimentoServidor Management Detail Component', () => {
    let comp: AgendaAtendimentoServidorDetailComponent;
    let fixture: ComponentFixture<AgendaAtendimentoServidorDetailComponent>;
    const route = ({ data: of({ agendaAtendimentoServidor: new AgendaAtendimentoServidor(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaAtendimentoServidorDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AgendaAtendimentoServidorDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AgendaAtendimentoServidorDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load agendaAtendimentoServidor on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.agendaAtendimentoServidor).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
