import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AgendaTestModule } from '../../../test.module';
import { AgendaSalaUpdateComponent } from 'app/entities/agenda-sala/agenda-sala-update.component';
import { AgendaSalaService } from 'app/entities/agenda-sala/agenda-sala.service';
import { AgendaSala } from 'app/shared/model/agenda-sala.model';

describe('Component Tests', () => {
  describe('AgendaSala Management Update Component', () => {
    let comp: AgendaSalaUpdateComponent;
    let fixture: ComponentFixture<AgendaSalaUpdateComponent>;
    let service: AgendaSalaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaSalaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AgendaSalaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaSalaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaSalaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AgendaSala(123);
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
        const entity = new AgendaSala();
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
