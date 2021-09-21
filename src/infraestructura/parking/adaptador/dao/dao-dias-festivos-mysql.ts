import { DaoDiasFestivos } from 'src/dominio/parking/puerto/dao/dao-dias-festivos';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DaoDiasFestivosMysql implements DaoDiasFestivos {
  constructor(@InjectEntityManager() private readonly entityManger: EntityManager){}

  cantidadDiasFestivos(fechaIngreso: Date, fechaSalida: Date) {
    let maxLength = 19;
    let startDate = new Date(fechaIngreso).toISOString().split('T').join(' ').substring(0,maxLength);
    let endDate = new Date(fechaSalida).toISOString().split('T').join(' ').substring(0,maxLength);
    return this.entityManger.query(`select * from colombia_holidays where diaCelebracion >= '${startDate}' and diaCelebracion <= '${endDate}'`);
  }
}
