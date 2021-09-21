import { DaoPlanes } from 'src/dominio/parking/puerto/dao/dao-planes';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DaoPlanesMysql implements DaoPlanes {
  constructor(@InjectEntityManager() private readonly entityManger: EntityManager){}

  async valorAPagarPorPlan(tipoPlan: number, tipoVehiculo: number): Promise<number> {
    let plan = await this.entityManger.query(`select * from planes where idPlan = ${tipoPlan} and tipoVehiculo = ${tipoVehiculo}`);
    return plan[0]?.valorPagar;
  }
}
