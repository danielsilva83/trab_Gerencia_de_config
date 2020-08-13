import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IServidor, Servidor } from 'app/shared/model/servidor.model';
import { ServidorService } from './servidor.service';
import { ServidorComponent } from './servidor.component';
import { ServidorDetailComponent } from './servidor-detail.component';
import { ServidorUpdateComponent } from './servidor-update.component';

@Injectable({ providedIn: 'root' })
export class ServidorResolve implements Resolve<IServidor> {
  constructor(private service: ServidorService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IServidor> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((servidor: HttpResponse<Servidor>) => {
          if (servidor.body) {
            return of(servidor.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Servidor());
  }
}

export const servidorRoute: Routes = [
  {
    path: '',
    component: ServidorComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Servidors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: ServidorDetailComponent,
    resolve: {
      servidor: ServidorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Servidors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: ServidorUpdateComponent,
    resolve: {
      servidor: ServidorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Servidors',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: ServidorUpdateComponent,
    resolve: {
      servidor: ServidorResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Servidors',
    },
    canActivate: [UserRouteAccessService],
  },
];
