import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAgendaAtendimentoServidor, AgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';
import { AgendaAtendimentoServidorService } from './agenda-atendimento-servidor.service';
import { IAgendaServidor } from 'app/shared/model/agenda-servidor.model';
import { AgendaServidorService } from 'app/entities/agenda-servidor/agenda-servidor.service';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno/aluno.service';

type SelectableEntity = IAgendaServidor | IAluno;

@Component({
  selector: 'jhi-agenda-atendimento-servidor-update',
  templateUrl: './agenda-atendimento-servidor-update.component.html',
})
export class AgendaAtendimentoServidorUpdateComponent implements OnInit {
  isSaving = false;
  agendaservidors: IAgendaServidor[] = [];
  alunos: IAluno[] = [];

  editForm = this.fb.group({
    id: [],
    status: [],
    agendaServidor: [],
    aluno: [],
  });

  constructor(
    protected agendaAtendimentoServidorService: AgendaAtendimentoServidorService,
    protected agendaServidorService: AgendaServidorService,
    protected alunoService: AlunoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agendaAtendimentoServidor }) => {
      this.updateForm(agendaAtendimentoServidor);

      this.agendaServidorService.query().subscribe((res: HttpResponse<IAgendaServidor[]>) => (this.agendaservidors = res.body || []));

      this.alunoService.query().subscribe((res: HttpResponse<IAluno[]>) => (this.alunos = res.body || []));
    });
  }

  updateForm(agendaAtendimentoServidor: IAgendaAtendimentoServidor): void {
    this.editForm.patchValue({
      id: agendaAtendimentoServidor.id,
      status: agendaAtendimentoServidor.status,
      agendaServidor: agendaAtendimentoServidor.agendaServidor,
      aluno: agendaAtendimentoServidor.aluno,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const agendaAtendimentoServidor = this.createFromForm();
    if (agendaAtendimentoServidor.id !== undefined) {
      this.subscribeToSaveResponse(this.agendaAtendimentoServidorService.update(agendaAtendimentoServidor));
    } else {
      this.subscribeToSaveResponse(this.agendaAtendimentoServidorService.create(agendaAtendimentoServidor));
    }
  }

  private createFromForm(): IAgendaAtendimentoServidor {
    return {
      ...new AgendaAtendimentoServidor(),
      id: this.editForm.get(['id'])!.value,
      status: this.editForm.get(['status'])!.value,
      agendaServidor: this.editForm.get(['agendaServidor'])!.value,
      aluno: this.editForm.get(['aluno'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgendaAtendimentoServidor>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
