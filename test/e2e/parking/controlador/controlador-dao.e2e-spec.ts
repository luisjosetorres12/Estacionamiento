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
import { ParkingDto } from 'src/aplicacion/parking/consulta/dto/parking.dto';
import { parkingEntidadPost, parkingModeloPost, parkingEntidadResultPost, parkingEntidadResultPostObject } from 'test/util/parking.entidad';
import { UtilTicketService } from 'src/dominio/parking/servicio/servicio-util-ticket';
import { EntityManager } from 'typeorm';
import { ParkingEntidad } from 'src/infraestructura/parking/entidad/parking.entidad';
import { ManejadorFiltrarTickets } from 'src/aplicacion/parking/consulta/filtrar-tickets.manejador';
import * as typeorm from 'typeorm';
import { ServicioActualizarTicket } from 'src/dominio/parking/servicio/servicio-actualizar-ticket';
import { servicioActualizarTicketProveedor } from 'src/infraestructura/parking/proveedor/servicio/servicio-actualizar-ticket.proveedor';
import { ManejadorActualizarTicket } from 'src/aplicacion/parking/comando/actualizar-ticket.manejador';
import { daoParkingProvidier } from 'src/infraestructura/parking/proveedor/dao/dao-parking.proveedor';
import { repositoryParkingProvidier } from 'src/infraestructura/parking/proveedor/repositorio/repositorio-parking.proveedor';
import { UtilTicketServiceProveedor } from 'src/infraestructura/parking/proveedor/servicio/servicio-util-ticket';

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
          inject:[RepositorioParking, UtilTicketService],
          useFactory:servicioRegistrarTicketProveedor
        },
        {
          provide:ServicioActualizarTicket,
          inject:[RepositorioParking, UtilTicketService],
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
        {provide: RepositorioParking, useValue: repositorioParking},
        UtilTicketService
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
})