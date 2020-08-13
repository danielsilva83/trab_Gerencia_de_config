import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISala } from 'app/shared/model/sala.model';
import { SalaService } from './sala.service';

@Component({
  templateUrl: './sala-delete-dialog.component.html',
})
export class SalaDeleteDialogComponent {
  sala?: ISala;

  constructor(protected salaService: SalaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.salaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('salaListModification');
      this.activeModal.close();
    });
  }
}
