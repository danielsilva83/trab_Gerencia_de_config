import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IAgendaSala } from 'app/shared/model/agenda-sala.model';

@Component({
  selector: 'jhi-agenda-sala-detail',
  templateUrl: './agenda-sala-detail.component.html',
})
export class AgendaSalaDetailComponent implements OnInit {
  agendaSala: IAgendaSala | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ agendaSala }) => (this.agendaSala = agendaSala));
  }

  previousState(): void {
    window.history.back();
  }
}
