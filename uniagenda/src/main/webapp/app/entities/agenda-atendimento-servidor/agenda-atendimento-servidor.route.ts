import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAgendaAtendimentoServidor, AgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';
import { AgendaAtendimentoServidorService } from './agenda-atendimento-servidor.service';
import { AgendaAtendimentoServidorComponent } from './agenda-atendimento-servidor.component';
import { AgendaAtendimentoServidorDetailComponent } from './agenda-atendimento-servidor-detail.component';
import { AgendaAtendimentoServidorUpdateComponent } from './agenda-atendimento-servidor-update.component';

@Injectable({ providedIn: 'root' })
export class AgendaAtendimentoServidorResolve implements Resolve<IAgendaAtendimentoServidor> {
  constructor(private service: AgendaAtendimentoServidorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAgendaAtendimentoServidor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((agendaAtendimentoServidor: HttpResponse<AgendaAtendimentoServidor>) => {
          if (agendaAtendimentoServidor.body) {
            return of(agendaAtendimentoServidor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AgendaAtendimentoServidor());
  }
}

export const agendaAtendimentoServidorRoute: Routes = [
  {
    path: '',
    component: AgendaAtendimentoServidorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaAtendimentoServidors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AgendaAtendimentoServidorDetailComponent,
    resolve: {
      agendaAtendimentoServidor: AgendaAtendimentoServidorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaAtendimentoServidors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AgendaAtendimentoServidorUpdateComponent,
    resolve: {
      agendaAtendimentoServidor: AgendaAtendimentoServidorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaAtendimentoServidors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AgendaAtendimentoServidorUpdateComponent,
    resolve: {
      agendaAtendimentoServidor: AgendaAtendimentoServidorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaAtendimentoServidors',
    },
    canActivate: [UserRouteAccessService],
  },
];
