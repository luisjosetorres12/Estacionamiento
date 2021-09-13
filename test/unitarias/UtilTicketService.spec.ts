import { UtilTicketService } from "src/dominio/parking/servicio/servicio-util-ticket";
import { createStubObj } from "test/util/create-object.stub";
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParkingEntidad } from "src/infraestructura/parking/entidad/parking.entidad";
import { stub,createSandbox, SinonStubbedInstance } from "sinon";
import { EntityManager } from "typeorm";
import * as typeorm from "typeorm";
import { ParkingDto } from "src/aplicacion/parking/consulta/dto/parking.dto";
import { Parking } from "src/dominio/parking/modelo/parking";


const sinonSandbox = createSandbox();
describe('UtilTicketService', () => {
  
  let utilService: UtilTicketService
  const sandbox = createSandbox()
  const entityManagerStub: SinonStubbedInstance<EntityManager> = sandbox.createStubInstance(typeorm.EntityManager);
  const getManager = stub(typeorm, 'getManager').returns(entityManagerStub as unknown as typeorm.EntityManager);
  
  beforeAll( async () => {
    utilService: UtilTicketService

    const moduleRef = await Test.createTestingModule({
      providers:[
        UtilTicketService,
        {
          provide: EntityManager,
          useValue:entityManagerStub
        }
      ]
    }).compile()

    utilService = moduleRef.get<UtilTicketService>(UtilTicketService);
  })

  it('Deberia calcularFechaSalida con Plan 4', () => {
    let fecha = utilService.calcularFechaSalida(new Date("2021-10-10T15:11:04.972Z"),4)
    expect(fecha).toMatchObject(new Date("2021-11-10T15:11:04.972Z"))
  })

  it('Deberia calcularFechaSalida con Plan 3', () => {
    let fecha = utilService.calcularFechaSalida(new Date("2021-10-10T15:11:04.972Z"),3)
    expect(fecha).toMatchObject(new Date("2021-10-17T15:11:04.972Z"))
  })

  it('Deberia calcularFechaSalida con Plan 2', () => {
    let fecha = utilService.calcularFechaSalida(new Date("2021-10-10T15:11:04.972Z"),2)
    expect(fecha).toMatchObject(new Date("2021-10-10T23:11:04.972Z"))
  })

  it('Deberia calcularFechaSalida con Plan 1', () => {
    let fecha = utilService.calcularFechaSalida(new Date("2021-10-10T15:11:04.972Z"),1)
    expect(fecha).toMatchObject(new Date("2021-10-10T16:11:04.972Z"))
  })

  it('Deberia calcularFechaSalida con Plan 0', () => {
    let fecha = utilService.calcularFechaSalida(new Date("2021-10-10T15:11:04.972Z"),0)
    expect(fecha).toMatchObject(new Date("2021-10-10T15:41:04.972Z"))
  })
  
  it('Deberia Calcular la demora', () => {
    let demora = utilService.calcularDemora(new Date("2021-10-10T15:15:04.972Z"), new Date("2021-10-10T15:11:04.972Z"))
    expect(demora).toBe(1000)
  })

  it('Deberia convertir de DTO a Entidad', () => {
    let ticket = new ParkingDto()
    ticket.documentoUsuario = "123456789";
    ticket.idPlan = 1;
    ticket.tipoVehiculo = 1;
    let entidad = utilService.fromDtoToEntity(1,ticket)
    expect(entidad.id).toBe(1)
    expect(entidad.tipoVehiculo).toBe(1)
    expect(entidad.documentoUsuario).toBe("123456789")
  })

  it('Debera calcular Valor a pagar por plan', async () => {
    let tipoPlan = 4
    entityManagerStub.query.withArgs(`select * from planes where id = ${tipoPlan}`).
    returns(Promise.resolve([{valorPagar:9800}]))
    let valorPagar = await utilService.valorAPagarPorPlan(4)
    expect(valorPagar).toBe(9800)
  })

  it('Deberia convertir de fromModelToEntity', () => {
    let entidad = utilService.fromModelToEntity(new Parking(1,1,"123456789",new Date("2021-10-13T15:15:04.972Z"),"ABC123"))
    expect(entidad.documentoUsuario).toBe("123456789")
    expect(entidad.idPlan).toBe(1)
    expect(entidad.tipoVehiculo).toBe(1)
    expect(entidad.fechaIngreso).toMatchObject(new Date("2021-10-13T15:15:04.972Z"))
  })

  it('deberia buscar cantidadDiasFestivos', async () => {
    entityManagerStub.query.returns(Promise.resolve([]))
    let diasFestivos = await utilService.cantidadDiasFestivos(new Date("2021-01-01T15:15:04.972Z"), new Date("2021-10-13T15:15:04.972Z"))
    expect(diasFestivos.length).toBe(0)
  })
})