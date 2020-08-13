import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { AgendaSharedModule } from 'app/shared/shared.module';
import { AgendaCoreModule } from 'app/core/core.module';
import { AgendaAppRoutingModule } from './app-routing.module';
import { AgendaHomeModule } from './home/home.module';
import { AgendaEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    AgendaSharedModule,
    AgendaCoreModule,
    AgendaHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    AgendaEntityModule,
    AgendaAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class AgendaAppModule {}
