import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { Parking } from 'src/dominio/parking/modelo/parking';
import { ServicioRegistrarTicket } from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import { RepositorioParking } from 'src/dominio/parking/puerto/repository/repositorio-parking';
import { ParkingDto } from 'src/aplicacion/parking/consulta/dto/parking.dto';
import { Test } from '@nestjs/testing';
import { RepositorioParkingMysql } from 'src/infraestructura/parking/adaptador/repositorio/repositorio-parking-mysql';
import { ParkingEntidad } from 'src/infraestructura/parking/entidad/parking.entidad';
import { TypeOrmModule } from '@nestjs/typeorm';

describe('Test Repositorio', () => {
  let app: RepositorioParkingMysql;

  beforeAll(async () => {
    const moduleRef = Test.createTestingModule({
      providers:[{provide:RepositorioParking, useClass: RepositorioParkingMysql }],
      imports:[TypeOrmModule.forFeature([ParkingEntidad])]
    }).compile()
  
    app = await (await moduleRef).resolve(RepositorioParkingMysql)
  })
  
  it('Test', () => {
    let result = app.calcularDemora(new Date("2021-09-07T15:11:04.972Z"), new Date("2021-09-07T15:11:04.972Z"))
    console.log(result)
  })

})