import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AgendaTestModule } from '../../../test.module';
import { AgendaAtendimentoServidorUpdateComponent } from 'app/entities/agenda-atendimento-servidor/agenda-atendimento-servidor-update.component';
import { AgendaAtendimentoServidorService } from 'app/entities/agenda-atendimento-servidor/agenda-atendimento-servidor.service';
import { AgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';

describe('Component Tests', () => {
  describe('AgendaAtendimentoServidor Management Update Component', () => {
    let comp: AgendaAtendimentoServidorUpdateComponent;
    let fixture: ComponentFixture<AgendaAtendimentoServidorUpdateComponent>;
    let service: AgendaAtendimentoServidorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaAtendimentoServidorUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AgendaAtendimentoServidorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaAtendimentoServidorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaAtendimentoServidorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AgendaAtendimentoServidor(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new AgendaAtendimentoServidor();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
