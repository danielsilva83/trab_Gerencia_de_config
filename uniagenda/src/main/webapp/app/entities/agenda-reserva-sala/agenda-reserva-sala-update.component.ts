import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAgendaReservaSala, AgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';
import { AgendaReservaSalaService } from './agenda-reserva-sala.service';
import { IAgendaSala } from 'app/shared/model/agenda-sala.model';
import { AgendaSalaService } from 'app/entities/agenda-sala/agenda-sala.service';
import { IAluno } from 'app/shared/model/aluno.model';
import { AlunoService } from 'app/entities/aluno/aluno.service';

type SelectableEntity = IAgendaSala | IAluno;

@Component({
  selector: 'jhi-agenda-reserva-sala-update',
  templateUrl: './agenda-reserva-sala-update.component.html',
})
export class AgendaReservaSalaUpdateComponent implements OnInit {
  isSaving = false;
  agendasalas: IAgendaSala[] = [];
  alunos: IAluno[] = [];

  editForm = this.fb.group({
    id: [],
    status: [],
    agendaSala: [],
    aluno: [],
  });

  constructor(
    protected agendaReservaSalaService: AgendaReservaSalaService,
    protected agendaSalaService: AgendaSalaService,
    protected alunoService: AlunoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agendaReservaSala }) => {
      this.updateForm(agendaReservaSala);

      this.agendaSalaService.query().subscribe((res: HttpResponse<IAgendaSala[]>) => (this.agendasalas = res.body || []));

      this.alunoService.query().subscribe((res: HttpResponse<IAluno[]>) => (this.alunos = res.body || []));
    });
  }

  updateForm(agendaReservaSala: IAgendaReservaSala): void {
    this.editForm.patchValue({
      id: agendaReservaSala.id,
      status: agendaReservaSala.status,
      agendaSala: agendaReservaSala.agendaSala,
      aluno: agendaReservaSala.aluno,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const agendaReservaSala = this.createFromForm();
    if (agendaReservaSala.id !== undefined) {
      this.subscribeToSaveResponse(this.agendaReservaSalaService.update(agendaReservaSala));
    } else {
      this.subscribeToSaveResponse(this.agendaReservaSalaService.create(agendaReservaSala));
    }
  }

  private createFromForm(): IAgendaReservaSala {
    return {
      ...new AgendaReservaSala(),
      id: this.editForm.get(['id'])!.value,
      status: this.editForm.get(['status'])!.value,
      agendaSala: this.editForm.get(['agendaSala'])!.value,
      aluno: this.editForm.get(['aluno'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgendaReservaSala>>): void {
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
