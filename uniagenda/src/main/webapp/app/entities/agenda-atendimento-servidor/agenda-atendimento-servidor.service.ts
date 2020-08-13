import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';

type EntityResponseType = HttpResponse<IAgendaAtendimentoServidor>;
type EntityArrayResponseType = HttpResponse<IAgendaAtendimentoServidor[]>;

@Injectable({ providedIn: 'root' })
export class AgendaAtendimentoServidorService {
  public resourceUrl = SERVER_API_URL + 'api/agenda-atendimento-servidors';

  constructor(protected http: HttpClient) {}

  create(agendaAtendimentoServidor: IAgendaAtendimentoServidor): Observable<EntityResponseType> {
    return this.http.post<IAgendaAtendimentoServidor>(this.resourceUrl, agendaAtendimentoServidor, { observe: 'response' });
  }

  update(agendaAtendimentoServidor: IAgendaAtendimentoServidor): Observable<EntityResponseType> {
    return this.http.put<IAgendaAtendimentoServidor>(this.resourceUrl, agendaAtendimentoServidor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgendaAtendimentoServidor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgendaAtendimentoServidor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
