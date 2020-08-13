import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { AgendaTestModule } from '../../../test.module';
import { AgendaReservaSalaUpdateComponent } from 'app/entities/agenda-reserva-sala/agenda-reserva-sala-update.component';
import { AgendaReservaSalaService } from 'app/entities/agenda-reserva-sala/agenda-reserva-sala.service';
import { AgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';

describe('Component Tests', () => {
  describe('AgendaReservaSala Management Update Component', () => {
    let comp: AgendaReservaSalaUpdateComponent;
    let fixture: ComponentFixture<AgendaReservaSalaUpdateComponent>;
    let service: AgendaReservaSalaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaReservaSalaUpdateComponent],
        providers: [FormBuilder],
      })
        .overrideTemplate(AgendaReservaSalaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AgendaReservaSalaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaReservaSalaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new AgendaReservaSala(123);
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
        const entity = new AgendaReservaSala();
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
