import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'cargo',
        loadChildren: () => import('./cargo/cargo.module').then(m => m.AgendaCargoModule),
      },
      {
        path: 'sala',
        loadChildren: () => import('./sala/sala.module').then(m => m.AgendaSalaModule),
      },
      {
        path: 'aluno',
        loadChildren: () => import('./aluno/aluno.module').then(m => m.AgendaAlunoModule),
      },
      {
        path: 'servidor',
        loadChildren: () => import('./servidor/servidor.module').then(m => m.AgendaServidorModule),
      },
      {
        path: 'agenda-servidor',
        loadChildren: () => import('./agenda-servidor/agenda-servidor.module').then(m => m.AgendaAgendaServidorModule),
      },
      {
        path: 'agenda-atendimento-servidor',
        loadChildren: () =>
          import('./agenda-atendimento-servidor/agenda-atendimento-servidor.module').then(m => m.AgendaAgendaAtendimentoServidorModule),
      },
      {
        path: 'agenda-sala',
        loadChildren: () => import('./agenda-sala/agenda-sala.module').then(m => m.AgendaAgendaSalaModule),
      },
      {
        path: 'agenda-reserva-sala',
        loadChildren: () => import('./agenda-reserva-sala/agenda-reserva-sala.module').then(m => m.AgendaAgendaReservaSalaModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class AgendaEntityModule {}
