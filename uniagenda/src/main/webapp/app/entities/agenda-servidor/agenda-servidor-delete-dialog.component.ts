import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgendaServidor } from 'app/shared/model/agenda-servidor.model';
import { AgendaServidorService } from './agenda-servidor.service';

@Component({
  templateUrl: './agenda-servidor-delete-dialog.component.html',
})
export class AgendaServidorDeleteDialogComponent {
  agendaServidor?: IAgendaServidor;

  constructor(
    protected agendaServidorService: AgendaServidorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.agendaServidorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('agendaServidorListModification');
      this.activeModal.close();
    });
  }
}
