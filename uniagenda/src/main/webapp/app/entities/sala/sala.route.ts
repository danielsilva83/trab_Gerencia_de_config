import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISala, Sala } from 'app/shared/model/sala.model';
import { SalaService } from './sala.service';
import { SalaComponent } from './sala.component';
import { SalaDetailComponent } from './sala-detail.component';
import { SalaUpdateComponent } from './sala-update.component';

@Injectable({ providedIn: 'root' })
export class SalaResolve implements Resolve<ISala> {
  constructor(private service: SalaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISala> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sala: HttpResponse<Sala>) => {
          if (sala.body) {
            return of(sala.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Sala());
  }
}

export const salaRoute: Routes = [
  {
    path: '',
    component: SalaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Salas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: SalaDetailComponent,
    resolve: {
      sala: SalaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Salas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: SalaUpdateComponent,
    resolve: {
      sala: SalaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Salas',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: SalaUpdateComponent,
    resolve: {
      sala: SalaResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Salas',
    },
    canActivate: [UserRouteAccessService],
  },
];
