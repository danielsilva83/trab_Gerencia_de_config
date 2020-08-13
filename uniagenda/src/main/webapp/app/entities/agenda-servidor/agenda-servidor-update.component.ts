import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IAgendaServidor, AgendaServidor } from 'app/shared/model/agenda-servidor.model';
import { AgendaServidorService } from './agenda-servidor.service';
import { IServidor } from 'app/shared/model/servidor.model';
import { ServidorService } from 'app/entities/servidor/servidor.service';

@Component({
  selector: 'jhi-agenda-servidor-update',
  templateUrl: './agenda-servidor-update.component.html',
})
export class AgendaServidorUpdateComponent implements OnInit {
  isSaving = false;
  servidors: IServidor[] = [];

  editForm = this.fb.group({
    id: [],
    mes: [],
    horario: [],
    diaMes: [],
    diaSemana: [],
    statusDia: [],
    servidor: [],
  });

  constructor(
    protected agendaServidorService: AgendaServidorService,
    protected servidorService: ServidorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agendaServidor }) => {
      this.updateForm(agendaServidor);

      this.servidorService.query().subscribe((res: HttpResponse<IServidor[]>) => (this.servidors = res.body || []));
    });
  }

  updateForm(agendaServidor: IAgendaServidor): void {
    this.editForm.patchValue({
      id: agendaServidor.id,
      mes: agendaServidor.mes,
      horario: agendaServidor.horario,
      diaMes: agendaServidor.diaMes,
      diaSemana: agendaServidor.diaSemana,
      statusDia: agendaServidor.statusDia,
      servidor: agendaServidor.servidor,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const agendaServidor = this.createFromForm();
    if (agendaServidor.id !== undefined) {
      this.subscribeToSaveResponse(this.agendaServidorService.update(agendaServidor));
    } else {
      this.subscribeToSaveResponse(this.agendaServidorService.create(agendaServidor));
    }
  }

  private createFromForm(): IAgendaServidor {
    return {
      ...new AgendaServidor(),
      id: this.editForm.get(['id'])!.value,
      mes: this.editForm.get(['mes'])!.value,
      horario: this.editForm.get(['horario'])!.value,
      diaMes: this.editForm.get(['diaMes'])!.value,
      diaSemana: this.editForm.get(['diaSemana'])!.value,
      statusDia: this.editForm.get(['statusDia'])!.value,
      servidor: this.editForm.get(['servidor'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAgendaServidor>>): void {
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

  trackById(index: number, item: IServidor): any {
    return item.id;
  }
}
