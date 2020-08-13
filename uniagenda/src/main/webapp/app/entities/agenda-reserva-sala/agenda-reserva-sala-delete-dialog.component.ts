import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';
import { AgendaReservaSalaService } from './agenda-reserva-sala.service';

@Component({
  templateUrl: './agenda-reserva-sala-delete-dialog.component.html',
})
export class AgendaReservaSalaDeleteDialogComponent {
  agendaReservaSala?: IAgendaReservaSala;

  constructor(
    protected agendaReservaSalaService: AgendaReservaSalaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.agendaReservaSalaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('agendaReservaSalaListModification');
      this.activeModal.close();
    });
  }
}
