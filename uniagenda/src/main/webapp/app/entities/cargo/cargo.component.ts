import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from './cargo.service';
import { CargoDeleteDialogComponent } from './cargo-delete-dialog.component';

@Component({
  selector: 'jhi-cargo',
  templateUrl: './cargo.component.html',
})
export class CargoComponent implements OnInit, OnDestroy {
  cargos?: ICargo[];
  eventSubscriber?: Subscription;

  constructor(protected cargoService: CargoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.cargoService.query().subscribe((res: HttpResponse<ICargo[]>) => (this.cargos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInCargos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ICargo): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInCargos(): void {
    this.eventSubscriber = this.eventManager.subscribe('cargoListModification', () => this.loadAll());
  }

  delete(cargo: ICargo): void {
    const modalRef = this.modalService.open(CargoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.cargo = cargo;
  }
}
