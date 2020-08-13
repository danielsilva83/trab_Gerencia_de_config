import { IAgendaSala } from 'app/shared/model/agenda-sala.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { StatusAgenda } from 'app/shared/model/enumerations/status-agenda.model';

export interface IAgendaReservaSala {
  id?: number;
  status?: StatusAgenda;
  agendaSala?: IAgendaSala;
  aluno?: IAluno;
}

export class AgendaReservaSala implements IAgendaReservaSala {
  constructor(public id?: number, public status?: StatusAgenda, public agendaSala?: IAgendaSala, public aluno?: IAluno) {}
}
