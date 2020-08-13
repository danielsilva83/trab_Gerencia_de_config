import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgendaSharedModule } from 'app/shared/shared.module';
import { AgendaSalaComponent } from './agenda-sala.component';
import { AgendaSalaDetailComponent } from './agenda-sala-detail.component';
import { AgendaSalaUpdateComponent } from './agenda-sala-update.component';
import { AgendaSalaDeleteDialogComponent } from './agenda-sala-delete-dialog.component';
import { agendaSalaRoute } from './agenda-sala.route';

@NgModule({
  imports: [AgendaSharedModule, RouterModule.forChild(agendaSalaRoute)],
  declarations: [AgendaSalaComponent, AgendaSalaDetailComponent, AgendaSalaUpdateComponent, AgendaSalaDeleteDialogComponent],
  entryComponents: [AgendaSalaDeleteDialogComponent],
})
export class AgendaAgendaSalaModule {}
