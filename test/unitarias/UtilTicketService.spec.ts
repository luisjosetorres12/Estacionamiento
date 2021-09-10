import { UtilTicketService } from "src/dominio/parking/servicio/servicio-util-ticket";
import { createStubObj } from "test/util/create-object.stub";
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParkingEntidad } from "src/infraestructura/parking/entidad/parking.entidad";
import { createSandbox, SinonStubbedInstance } from "sinon";

const sinonSandbox = createSandbox();

describe('UtilTicketService', () => {
  
  let utilService: SinonStubbedInstance<UtilTicketService>

  beforeAll( async () => {
    utilService = createStubObj<UtilTicketService>(['fromModelToEntity','valorAPagarPorPlan','calcularFechaSalida','cantidadDiasFestivos','calcularDemora'], sinonSandbox)

    const moduleRef = await Test.createTestingModule({
      providers:[
        {
          provide: UtilTicketService,
          useValue: utilService
        }
      ]
    }).compile()
  })

  it('Deberia calcularFechaSalida', () => {
    utilService.calcularFechaSalida
    .withArgs(new Date("2021-10-10T15:11:04.972Z"),4)
    .returns(new Date("2021-10-10T15:11:04.972Z"))
    let fecha = utilService.calcularFechaSalida(new Date("2021-10-10T15:11:04.972Z"),4)
    expect(fecha).toMatchObject(new Date("2021-10-10T15:11:04.972Z"))
  })

  it('Deberia calcularDemora', () => {
    utilService.calcularDemora
    .withArgs(new Date("2021-10-10T15:11:04.972Z"),new Date("2021-10-10T15:14:04.972Z"))
    .returns(750)
    let result = utilService.calcularDemora(new Date("2021-10-10T15:11:04.972Z"), new Date("2021-10-10T15:14:04.972Z"))
    expect(result).toBe(750)
  })
})