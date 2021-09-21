import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {DaoParking} from 'src/dominio/parking/puerto/dao/dao-parking';
import { createStubObj } from '../../../util/create-object.stub';
import {ParkingController} from 'src/infraestructura/parking/controlador/parking.controlador';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import {ServicioRegistrarTicket} from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import {servicioRegistrarTicketProveedor} from 'src/infraestructura/parking/proveedor/servicio/servicio-registrar-ticket.proveedor';
import { ManejadorRegistroTicket } from 'src/aplicacion/parking/comando/registro-ticket.manejador';
import { ManejadorListarTickets } from 'src/aplicacion/parking/consulta/listar-tickets.manejador';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { ManejadorMostrarTicket } from 'src/aplicacion/parking/consulta/mostrar-ticket.manejador';
import { ManejadorFiltrarTickets } from 'src/aplicacion/parking/consulta/filtrar-tickets.manejador';
import { ServicioActualizarTicket } from 'src/dominio/parking/servicio/servicio-actualizar-ticket';
import { servicioActualizarTicketProveedor } from 'src/infraestructura/parking/proveedor/servicio/servicio-actualizar-ticket.proveedor';
import { ManejadorActualizarTicket } from 'src/aplicacion/parking/comando/actualizar-ticket.manejador';
import { DaoPlanes } from 'src/dominio/parking/puerto/dao/dao-planes';
import { DaoDiasFestivos } from 'src/dominio/parking/puerto/dao/dao-dias-festivos';
import { ServicioFechaTickets } from 'src/dominio/parking/servicio/servicio-fechas-ticket';
import { ParseService } from 'src/aplicacion/parking/servicio/parser-service';
import { repositoryParkingProvidier } from 'src/infraestructura/parking/proveedor/repositorio/repositorio-parking.proveedor';
import { ParkingEntidad } from 'src/infraestructura/parking/entidad/parking.entidad';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// @ts-ignore
const repositoryMockFactory: () => MockType<Repository<any>> = jest.fn(() => ({
  findOne: jest.fn(entity => entity),
  save: jest.fn(entity => entity),
  update: jest.fn(entity => entity)
}));

const sinonSandbox = createSandbox();

describe('ControladorGet', () => {

  const sandbox = createSandbox()
  let app: INestApplication;
  let daoParking: SinonStubbedInstance<DaoParking>;
  let daoDiasFestivos: SinonStubbedInstance<DaoDiasFestivos>;
  let daoPlanes: SinonStubbedInstance<DaoPlanes>;
  // @ts-ignore
  let repositoryMock: MockType<Repository<ParkingEntidad>>;

  beforeAll(async () => {
    daoParking = createStubObj<DaoParking>(['buscar','crearQuery','filtrar','listar'], sinonSandbox)
    daoDiasFestivos = createStubObj<DaoDiasFestivos>(['cantidadDiasFestivos'], sinonSandbox)
    daoPlanes = createStubObj<DaoPlanes>(['valorAPagarPorPlan'], sinonSandbox)
    const module = await Test.createTestingModule({
      controllers:[ParkingController],
      providers:[
        AppLogger,
        {
          provide:ServicioRegistrarTicket,
          inject:[RepositorioParking, DaoPlanes ,DaoDiasFestivos, ServicioFechaTickets],
          useFactory:servicioRegistrarTicketProveedor
        },
        {
          provide:ServicioActualizarTicket,
          inject:[RepositorioParking],
          useFactory:servicioActualizarTicketProveedor
        },
        ManejadorRegistroTicket,
        ManejadorListarTickets,
        ManejadorMostrarTicket,
        ManejadorActualizarTicket,
        ManejadorFiltrarTickets,
        {provide: DaoParking, useValue: daoParking},
        {provide: DaoDiasFestivos, useValue: daoDiasFestivos},
        {provide: DaoPlanes, useValue: daoPlanes},
        ServicioFechaTickets,
        ParseService,
        { provide: getRepositoryToken(ParkingEntidad), useFactory: repositoryMockFactory },
        repositoryParkingProvidier
      ]
    }).compile()

    app = module.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    repositoryMock = module.get(getRepositoryToken(ParkingEntidad));
    await app.init();
  })

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Deberia registrar un ticket', async () => {
    let ticket = {
      "tipoVehiculo": 2,
      "idPlan": 1,
      "documentoUsuario":"1126705117",
      "fechaIngreso": "2021-09-06T13:20:55.883Z",
      "matricula":"ABC123"
    }
    repositoryMock.findOne.mockReturnValue(ticket);
    repositoryMock.save.mockReturnValue({id: 1});
    daoPlanes.valorAPagarPorPlan.returns(Promise.resolve(8200));
    daoDiasFestivos.cantidadDiasFestivos.returns([])
    const response = await request(app.getHttpServer())
    .post('/parking').send(ticket)
    .expect(HttpStatus.CREATED)
  })
})