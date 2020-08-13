import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';
import { AgendaReservaSalaService } from './agenda-reserva-sala.service';
import { AgendaReservaSalaDeleteDialogComponent } from './agenda-reserva-sala-delete-dialog.component';

@Component({
  selector: 'jhi-agenda-reserva-sala',
  templateUrl: './agenda-reserva-sala.component.html',
})
export class AgendaReservaSalaComponent implements OnInit, OnDestroy {
  agendaReservaSalas?: IAgendaReservaSala[];
  eventSubscriber?: Subscription;

  constructor(
    protected agendaReservaSalaService: AgendaReservaSalaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.agendaReservaSalaService
      .query()
      .subscribe((res: HttpResponse<IAgendaReservaSala[]>) => (this.agendaReservaSalas = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAgendaReservaSalas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAgendaReservaSala): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAgendaReservaSalas(): void {
    this.eventSubscriber = this.eventManager.subscribe('agendaReservaSalaListModification', () => this.loadAll());
  }

  delete(agendaReservaSala: IAgendaReservaSala): void {
    const modalRef = this.modalService.open(AgendaReservaSalaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.agendaReservaSala = agendaReservaSala;
  }
}
