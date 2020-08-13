import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { AgendaTestModule } from '../../../test.module';
import { SalaDetailComponent } from 'app/entities/sala/sala-detail.component';
import { Sala } from 'app/shared/model/sala.model';

describe('Component Tests', () => {
  describe('Sala Management Detail Component', () => {
    let comp: SalaDetailComponent;
    let fixture: ComponentFixture<SalaDetailComponent>;
    const route = ({ data: of({ sala: new Sala(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [SalaDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }],
      })
        .overrideTemplate(SalaDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(SalaDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load sala on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.sala).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
