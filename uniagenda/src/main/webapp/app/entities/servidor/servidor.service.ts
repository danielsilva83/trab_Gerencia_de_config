import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IServidor } from 'app/shared/model/servidor.model';

type EntityResponseType = HttpResponse<IServidor>;
type EntityArrayResponseType = HttpResponse<IServidor[]>;

@Injectable({ providedIn: 'root' })
export class ServidorService {
  public resourceUrl = SERVER_API_URL + 'api/servidors';

  constructor(protected http: HttpClient) {}

  create(servidor: IServidor): Observable<EntityResponseType> {
    return this.http.post<IServidor>(this.resourceUrl, servidor, { observe: 'response' });
  }

  update(servidor: IServidor): Observable<EntityResponseType> {
    return this.http.put<IServidor>(this.resourceUrl, servidor, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IServidor>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IServidor[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
