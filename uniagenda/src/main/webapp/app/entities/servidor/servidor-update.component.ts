import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IServidor, Servidor } from 'app/shared/model/servidor.model';
import { ServidorService } from './servidor.service';
import { ICargo } from 'app/shared/model/cargo.model';
import { CargoService } from 'app/entities/cargo/cargo.service';

@Component({
  selector: 'jhi-servidor-update',
  templateUrl: './servidor-update.component.html',
})
export class ServidorUpdateComponent implements OnInit {
  isSaving = false;
  cargos: ICargo[] = [];

  editForm = this.fb.group({
    id: [],
    codSiape: [],
    nomeServidor: [],
    cargo: [],
  });

  constructor(
    protected servidorService: ServidorService,
    protected cargoService: CargoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ servidor }) => {
      this.updateForm(servidor);

      this.cargoService.query().subscribe((res: HttpResponse<ICargo[]>) => (this.cargos = res.body || []));
    });
  }

  updateForm(servidor: IServidor): void {
    this.editForm.patchValue({
      id: servidor.id,
      codSiape: servidor.codSiape,
      nomeServidor: servidor.nomeServidor,
      cargo: servidor.cargo,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const servidor = this.createFromForm();
    if (servidor.id !== undefined) {
      this.subscribeToSaveResponse(this.servidorService.update(servidor));
    } else {
      this.subscribeToSaveResponse(this.servidorService.create(servidor));
    }
  }

  private createFromForm(): IServidor {
    return {
      ...new Servidor(),
      id: this.editForm.get(['id'])!.value,
      codSiape: this.editForm.get(['codSiape'])!.value,
      nomeServidor: this.editForm.get(['nomeServidor'])!.value,
      cargo: this.editForm.get(['cargo'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IServidor>>): void {
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

  trackById(index: number, item: ICargo): any {
    return item.id;
  }
}
