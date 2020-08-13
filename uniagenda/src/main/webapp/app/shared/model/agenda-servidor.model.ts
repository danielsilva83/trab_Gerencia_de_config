import { IAgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';
import { IServidor } from 'app/shared/model/servidor.model';
import { Mes } from 'app/shared/model/enumerations/mes.model';
import { Horario } from 'app/shared/model/enumerations/horario.model';
import { DiaMes } from 'app/shared/model/enumerations/dia-mes.model';
import { DiaSemana } from 'app/shared/model/enumerations/dia-semana.model';
import { StatusDia } from 'app/shared/model/enumerations/status-dia.model';

export interface IAgendaServidor {
  id?: number;
  mes?: Mes;
  horario?: Horario;
  diaMes?: DiaMes;
  diaSemana?: DiaSemana;
  statusDia?: StatusDia;
  ids?: IAgendaAtendimentoServidor[];
  servidor?: IServidor;
}

export class AgendaServidor implements IAgendaServidor {
  constructor(
    public id?: number,
    public mes?: Mes,
    public horario?: Horario,
    public diaMes?: DiaMes,
    public diaSemana?: DiaSemana,
    public statusDia?: StatusDia,
    public ids?: IAgendaAtendimentoServidor[],
    public servidor?: IServidor
  ) {}
}
