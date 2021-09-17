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
import { ComandoRegistrarTicket } from 'src/aplicacion/parking/comando/registrar-ticket.comando';
import { ManejadorMostrarTicket } from 'src/aplicacion/parking/consulta/mostrar-ticket.manejador';
import { ParkingDto } from 'src/aplicacion/parking/consulta/dto/parking.dto';
import { ManejadorActualizarTicket } from 'src/aplicacion/parking/comando/actualizar-ticket.manejador';
import { ServicioActualizarTicket } from 'src/dominio/parking/servicio/servicio-actualizar-ticket';
import {servicioActualizarTicketProveedor} from 'src/infraestructura/parking/proveedor/servicio/servicio-actualizar-ticket.proveedor';
import { parkingEntidadPost, parkingModeloPost, parkingEntidadResultPost, parkingEntidadResultPostObject } from 'test/util/parking.entidad';
import { UtilTicketService } from 'src/dominio/parking/servicio/servicio-util-ticket';
import { EntityManager } from 'typeorm';
import { ParkingEntidad } from 'src/infraestructura/parking/entidad/parking.entidad';
import { ManejadorFiltrarTickets } from 'src/aplicacion/parking/consulta/filtrar-tickets.manejador';


const sinonSandbox = createSandbox();

describe('Pruebas al controlador de Parking', () => {
  
  let app: INestApplication
  let repositorioParking: SinonStubbedInstance<RepositorioParking>
  let daoParking: SinonStubbedInstance<DaoParking>
  let utilService: SinonStubbedInstance<UtilTicketService>
  let entity: SinonStubbedInstance<EntityManager>
  beforeAll(async () => {
    repositorioParking = createStubObj<RepositorioParking>(['registrarTicket','actualizarTicket'], sinonSandbox);

    daoParking = createStubObj<DaoParking>(['listar','buscar'],sinonSandbox);

    utilService = createStubObj<UtilTicketService>(['fromModelToEntity','valorAPagarPorPlan','calcularFechaSalida','cantidadDiasFestivos', 'fromDtoToEntity','find',
    'calcularDemora'], sinonSandbox)
    entity = createStubObj<EntityManager>(['query','save','find'])
    const moduleRef = await Test.createTestingModule({
      controllers:[ParkingController],
      providers: [
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
        {provide: RepositorioParking, useValue: repositorioParking},
        {
          provide: UtilTicketService,
          useValue: utilService
        },
        {provide: DaoParking, useValue: daoParking},
        ManejadorRegistroTicket,
        ManejadorListarTickets,
        ManejadorMostrarTicket,
        ManejadorActualizarTicket,
        ManejadorFiltrarTickets
      ],
    }).compile()

    app = moduleRef.createNestApplication();
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

    daoParking.listar.returns(Promise.resolve(ticket))

    return request(app.getHttpServer())
     .get('/parking')
     .expect(HttpStatus.OK)
     .expect(ticket);
   });



  it('debería crear un ticket', async () => {

    // Stubs

    utilService.fromModelToEntity
    .withArgs(parkingModeloPost()).returns(parkingEntidadPost())

    utilService.valorAPagarPorPlan
    .withArgs(4,1)
    .returns(Promise.resolve(9800))



    utilService.calcularFechaSalida
    .withArgs(new Date("2021-09-10T15:11:04.972Z"),4)
    .returns(new Date("2021-10-10T15:11:04.972Z"))

    utilService.cantidadDiasFestivos
    .withArgs(new Date("2021-09-10T15:11:04.972Z"), new Date("2021-10-10T15:11:04.972Z"))
    .returns(Promise.resolve([]))

  
    repositorioParking.registrarTicket
    .returns(Promise.resolve(parkingEntidadResultPost()))

    const response = await request(app.getHttpServer())
      .post('/parking').send(parkingEntidadPost())
      .expect(HttpStatus.CREATED)
    expect(response.body).toMatchObject(parkingEntidadResultPostObject())
  });

   it('debería buscar un ticket', async () => {
    const ticket: ParkingDto = {
       "tipoVehiculo": 1,
       "idPlan": 4,
       "documentoUsuario": "1234567890",
       "fechaIngreso": new Date("2021-09-07T15:11:04.972Z"),
       "fechaSalidaSugerida": new Date("2021-10-07T15:11:04.972Z"),
       "matricula":"ABC123",
       "id":1,
       "fechaSalida": new Date("2021-10-07T15:11:04.972Z")
     }

     daoParking.buscar.returns(Promise.resolve(ticket))

     const result = await request(app.getHttpServer())
     .get('/parking/1')
     .expect(HttpStatus.OK)
    
     expect(result.body.id).toBe(ticket.id)
     expect(result.body.documentoUsuario).toBe(ticket.documentoUsuario)
   });

   it('debería fallar al intentar registrar un ticket un dia sabado', async () => {
     const ticket: ComandoRegistrarTicket = {
       "tipoVehiculo": 1,
       "idPlan": 4,
       "documentoUsuario": "1234567890",
       "fechaIngreso": new Date("2021-09-11T15:11:04.972Z"),
       "matricula":"ABC123",
       "fechaSalida": new Date("2021-10-07T15:11:04.972Z")
     };
     const mensaje = 'Fecha Invalida, no se puede registrar pedidos los fines de semana';

     const response = await request(app.getHttpServer())
       .post('/parking').send(ticket)
       .expect(HttpStatus.BAD_REQUEST);
     expect(response.body.message).toBe(mensaje);
     expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
   });

  

   it('debería fallar al intentar registrar un ticket un dia domingo', async () => {
     const ticket: ComandoRegistrarTicket = {
       "tipoVehiculo": 1,
       "idPlan": 4,
       "documentoUsuario": "1234567890",
       "fechaIngreso": new Date("2021-09-12T15:11:04.972Z"),
       "matricula":"ABC123",
       "fechaSalida": new Date("2021-10-07T15:11:04.972Z")
     };
     const mensaje = 'Fecha Invalida, no se puede registrar pedidos los fines de semana';

     const response = await request(app.getHttpServer())
       .post('/parking').send(ticket)
       .expect(HttpStatus.BAD_REQUEST);
     expect(response.body.message).toBe(mensaje);
     expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
   });


   it('debería fallar al intentar registrar un ticket con un tipo de vehiculo invalido', async () => {
     const ticket: ComandoRegistrarTicket = {
       "tipoVehiculo": 3,
       "idPlan": 4,
       "documentoUsuario": "1234567890",
       "fechaIngreso": new Date("2021-09-10T15:11:04.972Z"),
       "matricula":"ABC123",
       "fechaSalida": new Date("2021-10-07T15:11:04.972Z")
     };
     const mensaje = 'Tipo de vehiculo Invalido';

     const response = await request(app.getHttpServer())
       .post('/parking').send(ticket)
       .expect(HttpStatus.BAD_REQUEST);
     expect(response.body.message).toBe(mensaje);
     expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
   });

   it('debería fallar al intentar registrar un ticket con un tipo de plan invalido', async () => {
     const ticket: ComandoRegistrarTicket = {
       "tipoVehiculo": 1,
       "idPlan": 7,
       "documentoUsuario": "1234567890",
       "fechaIngreso": new Date("2021-09-10T15:11:04.972Z"),
       "matricula":"ABC123",
       "fechaSalida": new Date("2021-10-07T15:11:04.972Z")
     };
     const mensaje = 'Tipo de plan Invalido';

     const response = await request(app.getHttpServer())
       .post('/parking').send(ticket)
       .expect(HttpStatus.BAD_REQUEST);
     expect(response.body.message).toBe(mensaje);
     expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
   });

   it('Deberia actualizar ticket', async () => {
    let entidad = new ParkingEntidad()
     entidad.id = 1
     entidad.fechaSalida = new Date("2021-09-10T15:11:04.972Z")
     entidad.documentoUsuario = "123456789"
     entidad.idPlan = 1
     entidad.tipoVehiculo = 1
     entidad.matricula = "ABC123"

     utilService.fromDtoToEntity.returns(entidad)
     utilService.find.returns(Promise.resolve(parkingEntidadPost()))
     const response = await request(app.getHttpServer())
      .put('/parking/1').send({
        "tipoVehiculo": 1,
        "idPlan": 7,
        "documentoUsuario": "1234567890",
        "fechaSalida": new Date("2021-09-10T15:11:04.972Z"),
        "matricula":"ABC123",
      })
      .expect(HttpStatus.OK)
   })
})