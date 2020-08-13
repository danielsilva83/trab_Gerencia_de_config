import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';
import { AgendaAtendimentoServidorService } from './agenda-atendimento-servidor.service';
import { AgendaAtendimentoServidorDeleteDialogComponent } from './agenda-atendimento-servidor-delete-dialog.component';

@Component({
  selector: 'jhi-agenda-atendimento-servidor',
  templateUrl: './agenda-atendimento-servidor.component.html',
})
export class AgendaAtendimentoServidorComponent implements OnInit, OnDestroy {
  agendaAtendimentoServidors?: IAgendaAtendimentoServidor[];
  eventSubscriber?: Subscription;

  constructor(
    protected agendaAtendimentoServidorService: AgendaAtendimentoServidorService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.agendaAtendimentoServidorService
      .query()
      .subscribe((res: HttpResponse<IAgendaAtendimentoServidor[]>) => (this.agendaAtendimentoServidors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAgendaAtendimentoServidors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAgendaAtendimentoServidor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAgendaAtendimentoServidors(): void {
    this.eventSubscriber = this.eventManager.subscribe('agendaAtendimentoServidorListModification', () => this.loadAll());
  }

  delete(agendaAtendimentoServidor: IAgendaAtendimentoServidor): void {
    const modalRef = this.modalService.open(AgendaAtendimentoServidorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.agendaAtendimentoServidor = agendaAtendimentoServidor;
  }
}
