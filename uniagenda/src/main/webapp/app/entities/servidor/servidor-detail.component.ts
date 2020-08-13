import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IServidor } from 'app/shared/model/servidor.model';

@Component({
  selector: 'jhi-servidor-detail',
  templateUrl: './servidor-detail.component.html',
})
export class ServidorDetailComponent implements OnInit {
  servidor: IServidor | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ servidor }) => (this.servidor = servidor));
  }

  previousState(): void {
    window.history.back();
  }
}
