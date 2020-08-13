import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IAgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';

type EntityResponseType = HttpResponse<IAgendaReservaSala>;
type EntityArrayResponseType = HttpResponse<IAgendaReservaSala[]>;

@Injectable({ providedIn: 'root' })
export class AgendaReservaSalaService {
  public resourceUrl = SERVER_API_URL + 'api/agenda-reserva-salas';

  constructor(protected http: HttpClient) {}

  create(agendaReservaSala: IAgendaReservaSala): Observable<EntityResponseType> {
    return this.http.post<IAgendaReservaSala>(this.resourceUrl, agendaReservaSala, { observe: 'response' });
  }

  update(agendaReservaSala: IAgendaReservaSala): Observable<EntityResponseType> {
    return this.http.put<IAgendaReservaSala>(this.resourceUrl, agendaReservaSala, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IAgendaReservaSala>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IAgendaReservaSala[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
