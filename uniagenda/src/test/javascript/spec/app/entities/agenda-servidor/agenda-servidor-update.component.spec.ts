import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AgendaTestModule } from '../../../test.module';
import { AgendaServidorUpdateComponent } from 'app/entities/agenda-servidor/agenda-servidor-update.component';
import { AgendaServidorService } from 'app/entities/agenda-servidor/agenda-servidor.service';
import { AgendaServidor } from 'app/shared/model/agenda-servidor.model';

describe('Component Tests', () => {
  describe('AgendaServidor Management Update Component', () => {
    let comp: AgendaServidorUpdateComponent;
    let fixture: ComponentFixture<AgendaServidorUpdateComponent>;
    let service: AgendaServidorService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaServidorUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AgendaServidorUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaServidorUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaServidorService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AgendaServidor(123);
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
        const entity = new AgendaServidor();
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
