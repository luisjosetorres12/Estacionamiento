import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { createSandbox, SinonStubbedInstance } from 'sinon';
import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {DaoParking} from 'src/dominio/parking/puerto/dao/dao-parking';
import { createStubObj } from '../../../util/create-object.stub';
import { AppLogger } from 'src/infraestructura/configuracion/ceiba-logger.service';
import {ServicioRegistrarTicket} from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import {servicioRegistrarTicketProveedor} from 'src/infraestructura/parking/proveedor/servicio/servicio-registrar-ticket.proveedor';
import { ManejadorRegistroTicket } from 'src/aplicacion/parking/comando/registro-ticket.manejador';
import { ManejadorListarTickets } from 'src/aplicacion/parking/consulta/listar-tickets.manejador';
import { ManejadorListarTicketsPorPlan } from 'src/aplicacion/parking/consulta/listar-tickets-plan.manejador';
import { ManejadorListarTicketsPorTipoVehiculo } from 'src/aplicacion/parking/consulta/listar-tickets-vehiculo.manejador';
import { ManejadorListarTicketsPorUsuario } from 'src/aplicacion/parking/consulta/listar-tickets-usuario.manejador';
import { ManejadorMostrarTicket } from 'src/aplicacion/parking/consulta/mostrar-ticket.manejador';
import { ManejadorActualizarTicket } from 'src/aplicacion/parking/comando/actualizar-ticket.manejador';
import { ServicioActualizarTicket } from 'src/dominio/parking/servicio/servicio-actualizar-ticket';
import {servicioActualizarTicketProveedor} from 'src/infraestructura/parking/proveedor/servicio/servicio-actualizar-ticket.proveedor';
import { ParkingDto } from 'src/aplicacion/parking/consulta/dto/parking.dto';
import { Parking } from 'src/dominio/parking/modelo/parking';

const sinonSandbox = createSandbox();

describe('Pruebas al controlador de Parking', () => {
  
  let app: INestApplication
  let repositorioParking: SinonStubbedInstance<RepositorioParking>
  let daoParking: SinonStubbedInstance<DaoParking>

  beforeAll(async () => {
    repositorioParking = createStubObj<RepositorioParking>(['registrarTicket','valorDiasFestivos','registrosPorTipoPlan','registrosPorTipoVehiculo',
    'registrosPorUsuario','calcularDemora'], sinonSandbox);
    daoParking = createStubObj<DaoParking>(['listar','buscar'],sinonSandbox)
    const moduleRef = await Test.createTestingModule({
      providers: [
        AppLogger,
        {
          provide:ServicioRegistrarTicket,
          inject:[RepositorioParking],
          useFactory:servicioRegistrarTicketProveedor
        },
        {
          provide:ServicioActualizarTicket,
          inject:[RepositorioParking],
          useFactory:servicioActualizarTicketProveedor
        },
        {provide: RepositorioParking, useValue: repositorioParking},
        {provide: DaoParking, useValue: daoParking},
        ManejadorRegistroTicket,
        ManejadorListarTickets,
        ManejadorListarTicketsPorPlan,
        ManejadorListarTicketsPorTipoVehiculo,
        ManejadorListarTicketsPorUsuario,
        ManejadorMostrarTicket,
        ManejadorActualizarTicket
      ]
    }).compile()
  })


  afterEach(() => {
    sinonSandbox.restore();
  });

  afterAll(async () => {
    await app.close();
  });

  it('Deberia mostrar Si existen dias festivos en un rato de fechas', async () => {
    repositorioParking.valorDiasFestivos.returns(Promise.resolve([]))
    let diasFestivos = await repositorioParking.valorDiasFestivos(new Date("2021-09-01T15:11:04.972Z"),new Date("2021-09-30T15:11:04.972Z"))
    expect(diasFestivos.length).toBe(0)
  });

  it('Deberia registrar un ticket', async () => {
    const ticket: ParkingDto = {
      "tipoVehiculo": 1,
      "idPlan": 4,
      "documentoUsuario": "1234567890",
      "fechaIngreso": new Date("2021-09-10T15:11:04.972Z"),
      "matricula":"ABC123",
      "fechaSalidaSugerida": new Date("2021-10-07T15:11:04.972Z"),
      "fechaSalida": new Date("2021-10-07T15:11:04.972Z"),
      "id":1
    };

    repositorioParking.registrarTicket.returns(Promise.resolve(ticket))
    let ticketCreado = await repositorioParking.registrarTicket(new Parking(1,4,"1126705113",new Date("2021-09-10T15:11:04.972Z"),"ABC123"))
    expect(ticketCreado).toBe(ticket)

  });

  it('Deberia calcular la demora aca', () => {
    let result = 500

    repositorioParking.calcularDemora.withArgs(new Date("2021-09-10T15:13:04.972Z"),new Date("2021-09-10T15:11:04.972Z")).returns(500)
    let cantidad = repositorioParking.calcularDemora(new Date("2021-09-10T15:13:04.972Z"),new Date("2021-09-10T15:11:04.972Z"))
    expect(cantidad).toBe(result)
  })


})