import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AgendaTestModule } from '../../../test.module';
import { AgendaSalaDetailComponent } from 'app/entities/agenda-sala/agenda-sala-detail.component';
import { AgendaSala } from 'app/shared/model/agenda-sala.model';

describe('Component Tests', () => {
  describe('AgendaSala Management Detail Component', () => {
    let comp: AgendaSalaDetailComponent;
    let fixture: ComponentFixture<AgendaSalaDetailComponent>;
    const route = ({ data: of({ agendaSala: new AgendaSala(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AgendaSalaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(AgendaSalaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(AgendaSalaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load agendaSala on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.agendaSala).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
