import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AgendaAtendimentoServidorService } from 'app/entities/agenda-atendimento-servidor/agenda-atendimento-servidor.service';
import { IAgendaAtendimentoServidor, AgendaAtendimentoServidor } from 'app/shared/model/agenda-atendimento-servidor.model';
import { StatusAgenda } from 'app/shared/model/enumerations/status-agenda.model';

describe('Service Tests', () => {
  describe('AgendaAtendimentoServidor Service', () => {
    let injector: TestBed;
    let service: AgendaAtendimentoServidorService;
    let httpMock: HttpTestingController;
    let elemDefault: IAgendaAtendimentoServidor;
    let expectedResult: IAgendaAtendimentoServidor | IAgendaAtendimentoServidor[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AgendaAtendimentoServidorService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new AgendaAtendimentoServidor(0, StatusAgenda.Livre);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AgendaAtendimentoServidor', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new AgendaAtendimentoServidor()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AgendaAtendimentoServidor', () => {
        const returnedFromService = Object.assign(
          {
            status: 'BBBBBB',
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of AgendaAtendimentoServidor', () => {
        const returnedFromService = Object.assign(
          {
            status: 'BBBBBB',
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

      it('should delete a AgendaAtendimentoServidor', () => {
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
