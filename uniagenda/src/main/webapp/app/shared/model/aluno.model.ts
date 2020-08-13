import { IAgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';
import { IAgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';
import { Curso } from 'app/shared/model/enumerations/curso.model';

export interface IAluno {
  id?: number;
  raAluno?: number;
  nomeAluno?: string;
  periodo?: number;
  curso?: Curso;
  raAlunos?: IAgendaReservaSala[];
  ids?: IAgendaAtendimentoServidor[];
}

export class Aluno implements IAluno {
  constructor(
    public id?: number,
    public raAluno?: number,
    public nomeAluno?: string,
    public periodo?: number,
    public curso?: Curso,
    public raAlunos?: IAgendaReservaSala[],
    public ids?: IAgendaAtendimentoServidor[]
  ) {}
}
