import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from './aluno.service';
import { AlunoDeleteDialogComponent } from './aluno-delete-dialog.component';

@Component({
  selector: 'jhi-aluno',
  templateUrl: './aluno.component.html',
})
export class AlunoComponent implements OnInit, OnDestroy {
  alunos?: IAluno[];
  eventSubscriber?: Subscription;

  constructor(protected alunoService: AlunoService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.alunoService.query().subscribe((res: HttpResponse<IAluno[]>) => (this.alunos = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInAlunos();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IAluno): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInAlunos(): void {
    this.eventSubscriber = this.eventManager.subscribe('alunoListModification', () => this.loadAll());
  }

  delete(aluno: IAluno): void {
    const modalRef = this.modalService.open(AlunoDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.aluno = aluno;
  }
}
