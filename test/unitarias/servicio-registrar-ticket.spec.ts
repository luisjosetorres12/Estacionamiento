import { ServicioRegistrarTicket } from "src/dominio/parking/servicio/servicio-registrar-ticket";
import {Test, TestingModule} from "@nestjs/testing";
import { createSandbox, SinonStubbedInstance, stub } from "sinon";
import { EntityManager } from "typeorm";
import * as typeorm from "typeorm";

describe('Test', () => {
    const sandbox = createSandbox()
    const entityManagerStub: SinonStubbedInstance<EntityManager> = sandbox.createStubInstance(typeorm.EntityManager);
    const getManager = stub(typeorm, 'getManager').returns(entityManagerStub as unknown as typeorm.EntityManager);

    let service: ServicioRegistrarTicket

    beforeEach(async () => {
      /* NestJS related stuff */
      const module: TestingModule = await Test.createTestingModule({
          providers: [ServicioRegistrarTicket],
      }).compile();

      service = module.get<ServicioRegistrarTicket>(ServicioRegistrarTicket);
    });

    afterEach(() => sandbox.restore());

    it('Deberia estar definido', () => {
      expect(service).toBeDefined()
    })

})