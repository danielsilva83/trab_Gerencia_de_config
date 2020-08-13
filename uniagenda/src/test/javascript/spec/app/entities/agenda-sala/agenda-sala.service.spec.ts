import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AgendaSalaService } from 'app/entities/agenda-sala/agenda-sala.service';
import { IAgendaSala, AgendaSala } from 'app/shared/model/agenda-sala.model';
import { StatusDia } from 'app/shared/model/enumerations/status-dia.model';
import { Horario } from 'app/shared/model/enumerations/horario.model';
import { DiaMes } from 'app/shared/model/enumerations/dia-mes.model';
import { DiaSemana } from 'app/shared/model/enumerations/dia-semana.model';
import { Mes } from 'app/shared/model/enumerations/mes.model';

describe('Service Tests', () => {
  describe('AgendaSala Service', () => {
    let injector: TestBed;
    let service: AgendaSalaService;
    let httpMock: HttpTestingController;
    let elemDefault: IAgendaSala;
    let expectedResult: IAgendaSala | IAgendaSala[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AgendaSalaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new AgendaSala(0, StatusDia.Disponivel, Horario.H8, DiaMes.D1, DiaSemana.Segunda_feira, Mes.Janeiro);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AgendaSala', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new AgendaSala()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AgendaSala', () => {
        const returnedFromService = Object.assign(
          {
            status: 'BBBBBB',
            horario: 'BBBBBB',
            diaMes: 'BBBBBB',
            diaSemana: 'BBBBBB',
            mes: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AgendaSala', () => {
        const returnedFromService = Object.assign(
          {
            status: 'BBBBBB',
            horario: 'BBBBBB',
            diaMes: 'BBBBBB',
            diaSemana: 'BBBBBB',
            mes: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a AgendaSala', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
