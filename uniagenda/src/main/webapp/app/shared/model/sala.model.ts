import { IAgendaSala } from 'app/shared/model/agenda-sala.model';

export interface ISala {
  id?: number;
  nomeSala?: string;
  codigoSala?: string;
  codigoSalas?: IAgendaSala[];
}

export class Sala implements ISala {
  constructor(public id?: number, public nomeSala?: string, public codigoSala?: string, public codigoSalas?: IAgendaSala[]) {}
}
