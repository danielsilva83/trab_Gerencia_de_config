import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AgendaSharedModule } from 'app/shared/shared.module';
import { SalaComponent } from './sala.component';
import { SalaDetailComponent } from './sala-detail.component';
import { SalaUpdateComponent } from './sala-update.component';
import { SalaDeleteDialogComponent } from './sala-delete-dialog.component';
import { salaRoute } from './sala.route';

@NgModule({
  imports: [AgendaSharedModule, RouterModule.forChild(salaRoute)],
  declarations: [SalaComponent, SalaDetailComponent, SalaUpdateComponent, SalaDeleteDialogComponent],
  entryComponents: [SalaDeleteDialogComponent],
})
export class AgendaSalaModule {}
