import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgendaSharedModule } from 'app/shared/shared.module';
import { AgendaReservaSalaComponent } from './agenda-reserva-sala.component';
import { AgendaReservaSalaDetailComponent } from './agenda-reserva-sala-detail.component';
import { AgendaReservaSalaUpdateComponent } from './agenda-reserva-sala-update.component';
import { AgendaReservaSalaDeleteDialogComponent } from './agenda-reserva-sala-delete-dialog.component';
import { agendaReservaSalaRoute } from './agenda-reserva-sala.route';

@NgModule({
  imports: [AgendaSharedModule, RouterModule.forChild(agendaReservaSalaRoute)],
  declarations: [
    AgendaReservaSalaComponent,
    AgendaReservaSalaDetailComponent,
    AgendaReservaSalaUpdateComponent,
    AgendaReservaSalaDeleteDialogComponent,
  ],
  entryComponents: [AgendaReservaSalaDeleteDialogComponent],
})
export class AgendaAgendaReservaSalaModule {}
