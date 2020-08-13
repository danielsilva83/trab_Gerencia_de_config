import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IServidor } from 'app/shared/model/servidor.model';
import { ServidorService } from './servidor.service';
import { ServidorDeleteDialogComponent } from './servidor-delete-dialog.component';

@Component({
  selector: 'jhi-servidor',
  templateUrl: './servidor.component.html',
})
export class ServidorComponent implements OnInit, OnDestroy {
  servidors?: IServidor[];
  eventSubscriber?: Subscription;

  constructor(protected servidorService: ServidorService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.servidorService.query().subscribe((res: HttpResponse<IServidor[]>) => (this.servidors = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInServidors();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IServidor): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInServidors(): void {
    this.eventSubscriber = this.eventManager.subscribe('servidorListModification', () => this.loadAll());
  }

  delete(servidor: IServidor): void {
    const modalRef = this.modalService.open(ServidorDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.servidor = servidor;
  }
}
