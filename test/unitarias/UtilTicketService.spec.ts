import { UtilTicketService } from "src/dominio/parking/servicio/servicio-util-ticket";
import { createStubObj } from "test/util/create-object.stub";
import { Test } from '@nestjs/testing';
import { TypeOrmModule } from "@nestjs/typeorm";
import { ParkingEntidad } from "src/infraestructura/parking/entidad/parking.entidad";
import { stub,createSandbox, SinonStubbedInstance } from "sinon";
import { EntityManager } from "typeorm";
import * as typeorm from "typeorm";
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

  it('Deberia calcularFechaSalida', () => {
    let fecha = utilService.calcularFechaSalida(new Date("2021-10-10T15:11:04.972Z"),4)
    expect(fecha).toMatchObject(new Date("2021-11-10T15:11:04.972Z"))
  })
  
  it('Deberia Calcular la demora', () => {
    let demora = utilService.calcularDemora(new Date("2021-10-10T15:15:04.972Z"), new Date("2021-10-10T15:11:04.972Z"))
    expect(demora).toBe(1000)
  })
})