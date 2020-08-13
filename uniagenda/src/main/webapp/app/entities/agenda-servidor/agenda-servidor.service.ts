import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgendaServidor } from 'app/shared/model/agenda-servidor.model';

type EntityResponseType = HttpResponse<IAgendaServidor>;
type EntityArrayResponseType = HttpResponse<IAgendaServidor[]>;

@Injectable({ providedIn: 'root' })
export class AgendaServidorService {
  public resourceUrl = SERVER_API_URL + 'api/agenda-servidors';

  constructor(protected http: HttpClient) {}

  create(agendaServidor: IAgendaServidor): Observable<EntityResponseType> {
    return this.http.post<IAgendaServidor>(this.resourceUrl, agendaServidor, { observe: 'response' });
  }

  update(agendaServidor: IAgendaServidor): Observable<EntityResponseType> {
    return this.http.put<IAgendaServidor>(this.resourceUrl, agendaServidor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgendaServidor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgendaServidor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
