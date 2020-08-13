import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AgendaServidorService } from 'app/entities/agenda-servidor/agenda-servidor.service';
import { IAgendaServidor, AgendaServidor } from 'app/shared/model/agenda-servidor.model';
import { Mes } from 'app/shared/model/enumerations/mes.model';
import { Horario } from 'app/shared/model/enumerations/horario.model';
import { DiaMes } from 'app/shared/model/enumerations/dia-mes.model';
import { DiaSemana } from 'app/shared/model/enumerations/dia-semana.model';
import { StatusDia } from 'app/shared/model/enumerations/status-dia.model';

describe('Service Tests', () => {
  describe('AgendaServidor Service', () => {
    let injector: TestBed;
    let service: AgendaServidorService;
    let httpMock: HttpTestingController;
    let elemDefault: IAgendaServidor;
    let expectedResult: IAgendaServidor | IAgendaServidor[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AgendaServidorService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new AgendaServidor(0, Mes.Janeiro, Horario.H8, DiaMes.D1, DiaSemana.Segunda_feira, StatusDia.Disponivel);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AgendaServidor', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new AgendaServidor()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AgendaServidor', () => {
        const returnedFromService = Object.assign(
          {
            mes: 'BBBBBB',
            horario: 'BBBBBB',
            diaMes: 'BBBBBB',
            diaSemana: 'BBBBBB',
            statusDia: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AgendaServidor', () => {
        const returnedFromService = Object.assign(
          {
            mes: 'BBBBBB',
            horario: 'BBBBBB',
            diaMes: 'BBBBBB',
            diaSemana: 'BBBBBB',
            statusDia: 'BBBBBB',
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

      it('should delete a AgendaServidor', () => {
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
