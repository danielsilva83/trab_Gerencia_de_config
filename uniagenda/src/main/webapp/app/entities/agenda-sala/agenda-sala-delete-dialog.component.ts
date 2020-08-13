import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IAgendaSala } from 'app/shared/model/agenda-sala.model';
import { AgendaSalaService } from './agenda-sala.service';

@Component({
  templateUrl: './agenda-sala-delete-dialog.component.html',
})
export class AgendaSalaDeleteDialogComponent {
  agendaSala?: IAgendaSala;

  constructor(
    protected agendaSalaService: AgendaSalaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.agendaSalaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('agendaSalaListModification');
      this.activeModal.close();
    });
  }
}
