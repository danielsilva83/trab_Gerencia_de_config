import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAgendaServidor } from 'app/shared/model/agenda-servidor.model';
import { AgendaServidorService } from './agenda-servidor.service';
import { AgendaServidorDeleteDialogComponent } from './agenda-servidor-delete-dialog.component';

@Component({
  selector: 'jhi-agenda-servidor',
  templateUrl: './agenda-servidor.component.html',
})
export class AgendaServidorComponent implements OnInit, OnDestroy {
  agendaServidors?: IAgendaServidor[];
  eventSubscriber?: Subscription;

  constructor(
    protected agendaServidorService: AgendaServidorService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.agendaServidorService.query().subscribe((res: HttpResponse<IAgendaServidor[]>) => (this.agendaServidors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAgendaServidors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAgendaServidor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAgendaServidors(): void {
    this.eventSubscriber = this.eventManager.subscribe('agendaServidorListModification', () => this.loadAll());
  }

  delete(agendaServidor: IAgendaServidor): void {
    const modalRef = this.modalService.open(AgendaServidorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.agendaServidor = agendaServidor;
  }
}
