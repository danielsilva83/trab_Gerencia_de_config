import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgendaSala } from 'app/shared/model/agenda-sala.model';

type EntityResponseType = HttpResponse<IAgendaSala>;
type EntityArrayResponseType = HttpResponse<IAgendaSala[]>;

@Injectable({ providedIn: 'root' })
export class AgendaSalaService {
  public resourceUrl = SERVER_API_URL + 'api/agenda-salas';

  constructor(protected http: HttpClient) {}

  create(agendaSala: IAgendaSala): Observable<EntityResponseType> {
    return this.http.post<IAgendaSala>(this.resourceUrl, agendaSala, { observe: 'response' });
  }

  update(agendaSala: IAgendaSala): Observable<EntityResponseType> {
    return this.http.put<IAgendaSala>(this.resourceUrl, agendaSala, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgendaSala>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgendaSala[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
