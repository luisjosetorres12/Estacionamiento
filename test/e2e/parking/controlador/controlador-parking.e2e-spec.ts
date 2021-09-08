import * as request from 'supertest';
import { Test } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking'
import {DaoParking} from 'src/dominio/parking/puerto/dao/dao-parking'
import { createStubObj } from '../../../util/create-object.stub';
import {ParkingController} from 'src/infraestructura/parking/controlador/parking.controlador'
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import {ServicioRegistrarTicket} from 'src/dominio/parking/servicio/servicio-registrar-ticket'
import {servicioRegistrarTicketProveedor} from 'src/infraestructura/parking/proveedor/servicio/servicio-registrar-ticket.proveedor'
import { ManejadorRegistroTicket } from 'src/aplicacion/parking/comando/registro-ticket.manejador';
import { ManejadorListarTickets } from 'src/aplicacion/parking/consulta/listar-tickets.manejador';
import { FiltroExcepcionesDeNegocio } from 'src/infraestructura/excepciones/filtro-excepciones-negocio';
import { ManejadorListarTicketsPorPlan } from 'src/aplicacion/parking/consulta/listar-tickets-plan.manejador';
import { ManejadorListarTicketsPorTipoVehiculo } from 'src/aplicacion/parking/consulta/listar-tickets-vehiculo.manejador';
import { ManejadorListarTicketsPorUsuario } from 'src/aplicacion/parking/consulta/listar-tickets-usuario.manejador';
import { ComandoRegistrarTicket } from 'src/aplicacion/parking/comando/registrar-ticket.comando';
import { ManejadorMostrarTicket } from 'src/aplicacion/parking/consulta/mostrar-ticket.manejador';
import { ParkingDto } from 'src/aplicacion/parking/consulta/dto/parking.dto';

const sinonSandbox = createSandbox();

describe('Pruebas al controlador de Parking', () => {
  
  let app: INestApplication
  let repositorioParking: SinonStubbedInstance<RepositorioParking>
  let daoParking: SinonStubbedInstance<DaoParking>

  beforeAll(async () => {
    repositorioParking = createStubObj<RepositorioParking>(['registrarTicket','validarDiasFestivos','registrosPorTipoPlan','registrosPorTipoVehiculo','registrosPorUsuario'], sinonSandbox);
    daoParking = createStubObj<DaoParking>(['listar','buscar'],sinonSandbox)
    const moduleRef = await Test.createTestingModule({
      controllers:[ParkingController],
      providers: [
        AppLogger,
        {
          provide:ServicioRegistrarTicket,
          inject:[RepositorioParking],
          useFactory:servicioRegistrarTicketProveedor
        },
        {provide: RepositorioParking, useValue: repositorioParking},
        {provide: DaoParking, useValue: daoParking},
        ManejadorRegistroTicket,
        ManejadorListarTickets,
        ManejadorListarTicketsPorPlan,
        ManejadorListarTicketsPorTipoVehiculo,
        ManejadorListarTicketsPorUsuario,
        ManejadorMostrarTicket
      ]
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
    const ticket: ComandoRegistrarTicket = {
      "tipoVehiculo": 1,
      "idPlan": 4,
      "documentoUsuario": "1234567890",
      "fechaIngreso": new Date("2021-09-10T15:11:04.972Z"),
      "matricula":"ABC123"
    };

    const response = await request(app.getHttpServer())
      .post('/parking').send(ticket)
      .expect(HttpStatus.CREATED)
    
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
      "matricula":"ABC123"
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
      "matricula":"ABC123"
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
      "matricula":"ABC123"
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
      "matricula":"ABC123"
    };
    const mensaje = 'Tipo de plan Invalido';

    const response = await request(app.getHttpServer())
      .post('/parking').send(ticket)
      .expect(HttpStatus.BAD_REQUEST);
    expect(response.body.message).toBe(mensaje);
    expect(response.body.statusCode).toBe(HttpStatus.BAD_REQUEST);
  });

})