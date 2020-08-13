import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IServidor } from 'app/shared/model/servidor.model';
import { ServidorService } from './servidor.service';

@Component({
  templateUrl: './servidor-delete-dialog.component.html',
})
export class ServidorDeleteDialogComponent {
  servidor?: IServidor;

  constructor(protected servidorService: ServidorService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.servidorService.delete(id).subscribe(() => {
      this.eventManager.broadcast('servidorListModification');
      this.activeModal.close();
    });
  }
}
