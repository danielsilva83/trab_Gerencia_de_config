import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgendaSharedModule } from 'app/shared/shared.module';
import { AgendaServidorComponent } from './agenda-servidor.component';
import { AgendaServidorDetailComponent } from './agenda-servidor-detail.component';
import { AgendaServidorUpdateComponent } from './agenda-servidor-update.component';
import { AgendaServidorDeleteDialogComponent } from './agenda-servidor-delete-dialog.component';
import { agendaServidorRoute } from './agenda-servidor.route';

@NgModule({
  imports: [AgendaSharedModule, RouterModule.forChild(agendaServidorRoute)],
  declarations: [
    AgendaServidorComponent,
    AgendaServidorDetailComponent,
    AgendaServidorUpdateComponent,
    AgendaServidorDeleteDialogComponent,
  ],
  entryComponents: [AgendaServidorDeleteDialogComponent],
})
export class AgendaAgendaServidorModule {}
