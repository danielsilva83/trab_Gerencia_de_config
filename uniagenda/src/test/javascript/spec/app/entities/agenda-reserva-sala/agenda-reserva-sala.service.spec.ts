import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AgendaReservaSalaService } from 'app/entities/agenda-reserva-sala/agenda-reserva-sala.service';
import { IAgendaReservaSala, AgendaReservaSala } from 'app/shared/model/agenda-reserva-sala.model';
import { StatusAgenda } from 'app/shared/model/enumerations/status-agenda.model';

describe('Service Tests', () => {
  describe('AgendaReservaSala Service', () => {
    let injector: TestBed;
    let service: AgendaReservaSalaService;
    let httpMock: HttpTestingController;
    let elemDefault: IAgendaReservaSala;
    let expectedResult: IAgendaReservaSala | IAgendaReservaSala[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule],
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(AgendaReservaSalaService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new AgendaReservaSala(0, StatusAgenda.Livre);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a AgendaReservaSala', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new AgendaReservaSala()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a AgendaReservaSala', () => {
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

      it('should return a list of AgendaReservaSala', () => {
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

      it('should delete a AgendaReservaSala', () => {
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
