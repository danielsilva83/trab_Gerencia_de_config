import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { AgendaTestModule } from '../../../test.module';
import { AlunoComponent } from 'app/entities/aluno/aluno.component';
import { AlunoService } from 'app/entities/aluno/aluno.service';
import { Aluno } from 'app/shared/model/aluno.model';

describe('Component Tests', () => {
  describe('Aluno Management Component', () => {
    let comp: AlunoComponent;
    let fixture: ComponentFixture<AlunoComponent>;
    let service: AlunoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [AgendaTestModule],
        declarations: [AlunoComponent],
      })
        .overrideTemplate(AlunoComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(AlunoComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(AlunoService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Aluno(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.alunos && comp.alunos[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
