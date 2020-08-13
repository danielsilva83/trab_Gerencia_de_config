import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IAgendaSala, AgendaSala } from 'app/shared/model/agenda-sala.model';
import { AgendaSalaService } from './agenda-sala.service';
import { AgendaSalaComponent } from './agenda-sala.component';
import { AgendaSalaDetailComponent } from './agenda-sala-detail.component';
import { AgendaSalaUpdateComponent } from './agenda-sala-update.component';

@Injectable({ providedIn: 'root' })
export class AgendaSalaResolve implements Resolve<IAgendaSala> {
  constructor(private service: AgendaSalaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IAgendaSala> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((agendaSala: HttpResponse<AgendaSala>) => {
          if (agendaSala.body) {
            return of(agendaSala.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new AgendaSala());
  }
}

export const agendaSalaRoute: Routes = [
  {
    path: '',
    component: AgendaSalaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaSalas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AgendaSalaDetailComponent,
    resolve: {
      agendaSala: AgendaSalaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaSalas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AgendaSalaUpdateComponent,
    resolve: {
      agendaSala: AgendaSalaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaSalas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AgendaSalaUpdateComponent,
    resolve: {
      agendaSala: AgendaSalaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'AgendaSalas',
    },
    canActivate: [UserRouteAccessService],
  },
];
