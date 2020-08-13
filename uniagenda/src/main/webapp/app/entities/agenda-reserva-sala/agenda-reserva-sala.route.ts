import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAgendaReservaSala, AgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';
import { AgendaReservaSalaService } from './agenda-reserva-sala.service';
import { AgendaReservaSalaComponent } from './agenda-reserva-sala.component';
import { AgendaReservaSalaDetailComponent } from './agenda-reserva-sala-detail.component';
import { AgendaReservaSalaUpdateComponent } from './agenda-reserva-sala-update.component';

@Injectable({ providedIn: 'root' })
export class AgendaReservaSalaResolve implements Resolve<IAgendaReservaSala> {
  constructor(private service: AgendaReservaSalaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAgendaReservaSala> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((agendaReservaSala: HttpResponse<AgendaReservaSala>) => {
          if (agendaReservaSala.body) {
            return of(agendaReservaSala.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AgendaReservaSala());
  }
}

export const agendaReservaSalaRoute: Routes = [
  {
    path: '',
    component: AgendaReservaSalaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaReservaSalas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AgendaReservaSalaDetailComponent,
    resolve: {
      agendaReservaSala: AgendaReservaSalaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaReservaSalas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AgendaReservaSalaUpdateComponent,
    resolve: {
      agendaReservaSala: AgendaReservaSalaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaReservaSalas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AgendaReservaSalaUpdateComponent,
    resolve: {
      agendaReservaSala: AgendaReservaSalaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaReservaSalas',
    },
    canActivate: [UserRouteAccessService],
  },
];
