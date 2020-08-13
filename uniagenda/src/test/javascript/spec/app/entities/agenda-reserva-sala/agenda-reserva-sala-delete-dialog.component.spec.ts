import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { AgendaTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { AgendaReservaSalaDeleteDialogComponent } from 'app/entities/agenda-reserva-sala/agenda-reserva-sala-delete-dialog.component';
import { AgendaReservaSalaService } from 'app/entities/agenda-reserva-sala/agenda-reserva-sala.service';

describe('Component Tests', () => {
  describe('AgendaReservaSala Management Delete Component', () => {
    let comp: AgendaReservaSalaDeleteDialogComponent;
    let fixture: ComponentFixture<AgendaReservaSalaDeleteDialogComponent>;
    let service: AgendaReservaSalaService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaReservaSalaDeleteDialogComponent],
      })
        .overrideTemplate(AgendaReservaSalaDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AgendaReservaSalaDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AgendaReservaSalaService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
