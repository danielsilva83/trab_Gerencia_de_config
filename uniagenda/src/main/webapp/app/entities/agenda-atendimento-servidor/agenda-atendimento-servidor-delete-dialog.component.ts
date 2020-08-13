import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';
import { AgendaAtendimentoServidorService } from './agenda-atendimento-servidor.service';

@Component({
  templateUrl: './agenda-atendimento-servidor-delete-dialog.component.html',
})
export class AgendaAtendimentoServidorDeleteDialogComponent {
  agendaAtendimentoServidor?: IAgendaAtendimentoServidor;

  constructor(
    protected agendaAtendimentoServidorService: AgendaAtendimentoServidorService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.agendaAtendimentoServidorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('agendaAtendimentoServidorListModification');
      this.activeModal.close();
    });
  }
}
