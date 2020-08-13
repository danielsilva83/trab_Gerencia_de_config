import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgendaSala } from 'app/shared/model/agenda-sala.model';
import { AgendaSalaService } from './agenda-sala.service';
import { AgendaSalaDeleteDialogComponent } from './agenda-sala-delete-dialog.component';

@Component({
  selector: 'jhi-agenda-sala',
  templateUrl: './agenda-sala.component.html',
})
export class AgendaSalaComponent implements OnInit, OnDestroy {
  agendaSalas?: IAgendaSala[];
  eventSubscriber?: Subscription;

  constructor(protected agendaSalaService: AgendaSalaService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.agendaSalaService.query().subscribe((res: HttpResponse<IAgendaSala[]>) => (this.agendaSalas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAgendaSalas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAgendaSala): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAgendaSalas(): void {
    this.eventSubscriber = this.eventManager.subscribe('agendaSalaListModification', () => this.loadAll());
  }

  delete(agendaSala: IAgendaSala): void {
    const modalRef = this.modalService.open(AgendaSalaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.agendaSala = agendaSala;
  }
}
