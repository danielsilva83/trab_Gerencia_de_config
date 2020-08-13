import { IAgendaServidor } from 'app/shared/model/agenda-servidor.model';
import { IAluno } from 'app/shared/model/aluno.model';
import { StatusAgenda } from 'app/shared/model/enumerations/status-agenda.model';

export interface IAgendaAtendimentoServidor {
  id?: number;
  status?: StatusAgenda;
  agendaServidor?: IAgendaServidor;
  aluno?: IAluno;
}

export class AgendaAtendimentoServidor implements IAgendaAtendimentoServidor {
  constructor(public id?: number, public status?: StatusAgenda, public agendaServidor?: IAgendaServidor, public aluno?: IAluno) {}
}
