import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAgendaServidor, AgendaServidor } from 'app/shared/model/agenda-servidor.model';
import { AgendaServidorService } from './agenda-servidor.service';
import { AgendaServidorComponent } from './agenda-servidor.component';
import { AgendaServidorDetailComponent } from './agenda-servidor-detail.component';
import { AgendaServidorUpdateComponent } from './agenda-servidor-update.component';

@Injectable({ providedIn: 'root' })
export class AgendaServidorResolve implements Resolve<IAgendaServidor> {
  constructor(private service: AgendaServidorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAgendaServidor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((agendaServidor: HttpResponse<AgendaServidor>) => {
          if (agendaServidor.body) {
            return of(agendaServidor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AgendaServidor());
  }
}

export const agendaServidorRoute: Routes = [
  {
    path: '',
    component: AgendaServidorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaServidors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AgendaServidorDetailComponent,
    resolve: {
      agendaServidor: AgendaServidorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaServidors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AgendaServidorUpdateComponent,
    resolve: {
      agendaServidor: AgendaServidorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaServidors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AgendaServidorUpdateComponent,
    resolve: {
      agendaServidor: AgendaServidorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaServidors',
    },
    canActivate: [UserRouteAccessService],
  },
];
