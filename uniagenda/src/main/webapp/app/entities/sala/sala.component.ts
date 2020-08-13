import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISala } from 'app/shared/model/sala.model';
import { SalaService } from './sala.service';
import { SalaDeleteDialogComponent } from './sala-delete-dialog.component';

@Component({
  selector: 'jhi-sala',
  templateUrl: './sala.component.html',
})
export class SalaComponent implements OnInit, OnDestroy {
  salas?: ISala[];
  eventSubscriber?: Subscription;

  constructor(protected salaService: SalaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.salaService.query().subscribe((res: HttpResponse<ISala[]>) => (this.salas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSalas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISala): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSalas(): void {
    this.eventSubscriber = this.eventManager.subscribe('salaListModification', () => this.loadAll());
  }

  delete(sala: ISala): void {
    const modalRef = this.modalService.open(SalaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sala = sala;
  }
}
