import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { stub,createSandbox, SinonStubbedInstance } from 'sinon';
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
import { ComandoRegistrarTicket } from 'src/aplicacion/parking/comando/registrar-ticket.comando';
import { ManejadorMostrarTicket } from 'src/aplicacion/parking/consulta/mostrar-ticket.manejador';
import { EntityManager } from 'typeorm';
import { ManejadorFiltrarTickets } from 'src/aplicacion/parking/consulta/filtrar-tickets.manejador';
import * as typeorm from 'typeorm';
import { ServicioActualizarTicket } from 'src/dominio/parking/servicio/servicio-actualizar-ticket';
import { servicioActualizarTicketProveedor } from 'src/infraestructura/parking/proveedor/servicio/servicio-actualizar-ticket.proveedor';
import { ManejadorActualizarTicket } from 'src/aplicacion/parking/comando/actualizar-ticket.manejador';
import { daoParkingProvidier } from 'src/infraestructura/parking/proveedor/dao/dao-parking.proveedor';
import { DaoPlanes } from 'src/dominio/parking/puerto/dao/dao-planes';
import { DaoDiasFestivos } from 'src/dominio/parking/puerto/dao/dao-dias-festivos';
import { ServicioFechaTickets } from 'src/dominio/parking/servicio/servicio-fechas-ticket';
import { daoPlanesProvidier } from 'src/infraestructura/parking/proveedor/dao/dao-planes.proveedor';
import { daoDiasFestivosProvidier } from 'src/infraestructura/parking/proveedor/dao/dao-dias-festivos.proveedor';
import { ParseService } from 'src/aplicacion/parking/servicio/parser-service';

const sinonSandbox = createSandbox();

describe('ControladorGet', () => {

  const sandbox = createSandbox()
  const entityManagerStub: SinonStubbedInstance<EntityManager> = sandbox.createStubInstance(typeorm.EntityManager);
  const getManager = stub(typeorm, 'getManager').returns(entityManagerStub as unknown as typeorm.EntityManager);
  let app: INestApplication;
  let repositorioParking: SinonStubbedInstance<RepositorioParking>

  
  beforeAll(async () => {
    repositorioParking = createStubObj<RepositorioParking>(['registrarTicket','actualizarTicket'], sinonSandbox);
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
        {
          provide: EntityManager,
          useValue:entityManagerStub
        },
        ManejadorRegistroTicket,
        ManejadorListarTickets,
        ManejadorMostrarTicket,
        ManejadorActualizarTicket,
        ManejadorFiltrarTickets,
        daoParkingProvidier,
        daoPlanesProvidier,
        daoDiasFestivosProvidier,
        {provide: RepositorioParking, useValue: repositorioParking},
        ServicioFechaTickets,
        ParseService
      ]
    }).compile()

    app = module.createNestApplication();
    const logger = await app.resolve(AppLogger);
    logger.customError = sinonSandbox.stub();
    app.useGlobalFilters(new FiltroExcepcionesDeNegocio(logger));
    await app.init();
  })

  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('debería listar todos los tickets', () => {
    const ticket: any[] = [{
      "tipoVehiculo": 1,
      "idPlan": 4,
      "documentoUsuario": "1234567890",
      "fechaIngreso": "2021-09-07T15:11:04.972Z",
      "matricula":"ABC123"
    }]

    entityManagerStub.query.returns(Promise.resolve(ticket))
    

   return request(app.getHttpServer())
    .get('/parking')
    .expect(HttpStatus.OK)
    .expect(ticket);
  });

  it('debería listar por documentoUsuario', async () => {
    const tickets: any[] = [
      {
      "tipoVehiculo": 1,
      "idPlan": 4,
      "documentoUsuario": "1234567890",
      "fechaIngreso": "2021-09-07T15:11:04.972Z",
      "matricula":"ABC123"
      },
      {
        "tipoVehiculo": 1,
        "idPlan": 4,
        "documentoUsuario": "123456789",
        "fechaIngreso": "2021-09-07T15:11:04.972Z",
        "matricula":"ABC123"
      }
    ]

    entityManagerStub.query.returns(Promise.resolve(tickets.filter(ticket => ticket["documentoUsuario"] === "123456789")))
    

   const response = await request(app.getHttpServer())
    .get('/parking/search?page=0&documentoUsuario=123456789')
    .expect(HttpStatus.OK)
  
  expect(response.body.length).toBe(1)
  });

  it('Deberia buscar un ticket especifio', async () => {
    const ticket: any[] = [{
      "tipoVehiculo": 1,
      "idPlan": 4,
      "documentoUsuario": "1234567890",
      "fechaIngreso": "2021-09-07T15:11:04.972Z",
      "matricula":"ABC123"
    }]

    entityManagerStub.query.returns(Promise.resolve(ticket))

    const response = await request(app.getHttpServer())
    .get('/parking/1')
    .expect(HttpStatus.OK)
  
  expect(response.body.length).toBe(1)
  })

  it('Deberia buscar un ticket especifio y retornar extra valor a pagar', async () => {
    const ticket: any[] = [{
      "tipoVehiculo": 1,
      "idPlan": 4,
      "documentoUsuario": "1234567890",
      "fechaSalidaSugerida":"2021-09-07T15:11:04.972Z",
      "matricula":"ABC123"
    }]

    entityManagerStub.query.returns(Promise.resolve(ticket))

    const response = await request(app.getHttpServer())
    .get('/parking/1')
    .expect(HttpStatus.OK)
  expect(response.body.length).toBe(1)
  expect(response.body[0].extraValorPagar).not.toBe(undefined)
  })
})