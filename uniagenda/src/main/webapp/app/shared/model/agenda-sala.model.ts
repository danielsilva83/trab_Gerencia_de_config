import { IAgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';
import { ISala } from 'app/shared/model/sala.model';
import { StatusDia } from 'app/shared/model/enumerations/status-dia.model';
import { Horario } from 'app/shared/model/enumerations/horario.model';
import { DiaMes } from 'app/shared/model/enumerations/dia-mes.model';
import { DiaSemana } from 'app/shared/model/enumerations/dia-semana.model';
import { Mes } from 'app/shared/model/enumerations/mes.model';

export interface IAgendaSala {
  id?: number;
  status?: StatusDia;
  horario?: Horario;
  diaMes?: DiaMes;
  diaSemana?: DiaSemana;
  mes?: Mes;
  ids?: IAgendaReservaSala[];
  sala?: ISala;
}

export class AgendaSala implements IAgendaSala {
  constructor(
    public id?: number,
    public status?: StatusDia,
    public horario?: Horario,
    public diaMes?: DiaMes,
    public diaSemana?: DiaSemana,
    public mes?: Mes,
    public ids?: IAgendaReservaSala[],
    public sala?: ISala
  ) {}
}
