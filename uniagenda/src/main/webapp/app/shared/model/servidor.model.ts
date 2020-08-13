import { IAgendaServidor } from 'app/shared/model/agenda-servidor.model';
import { ICargo } from 'app/shared/model/cargo.model';

export interface IServidor {
  id?: number;
  codSiape?: number;
  nomeServidor?: string;
  ids?: IAgendaServidor[];
  cargo?: ICargo;
}

export class Servidor implements IServidor {
  constructor(
    public id?: number,
    public codSiape?: number,
    public nomeServidor?: string,
    public ids?: IAgendaServidor[],
    public cargo?: ICargo
  ) {}
}
