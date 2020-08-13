import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgendaSharedModule } from 'app/shared/shared.module';
import { AgendaAtendimentoServidorComponent } from './agenda-atendimento-servidor.component';
import { AgendaAtendimentoServidorDetailComponent } from './agenda-atendimento-servidor-detail.component';
import { AgendaAtendimentoServidorUpdateComponent } from './agenda-atendimento-servidor-update.component';
import { AgendaAtendimentoServidorDeleteDialogComponent } from './agenda-atendimento-servidor-delete-dialog.component';
import { agendaAtendimentoServidorRoute } from './agenda-atendimento-servidor.route';

@NgModule({
  imports: [AgendaSharedModule, RouterModule.forChild(agendaAtendimentoServidorRoute)],
  declarations: [
    AgendaAtendimentoServidorComponent,
    AgendaAtendimentoServidorDetailComponent,
    AgendaAtendimentoServidorUpdateComponent,
    AgendaAtendimentoServidorDeleteDialogComponent,
  ],
  entryComponents: [AgendaAtendimentoServidorDeleteDialogComponent],
})
export class AgendaAgendaAtendimentoServidorModule {}
