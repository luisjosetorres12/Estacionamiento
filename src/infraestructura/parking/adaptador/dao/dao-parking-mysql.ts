
import {DaoParking} from '../../../../dominio/parking/puerto/dao/dao-parking';
import {ParkingDto} from '../../../../aplicacion/parking/consulta/dto/parking.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DaoParkingMysql implements DaoParking{

  constructor(@InjectEntityManager() private readonly entityManger: EntityManager){}

  async listar() :Promise<ParkingDto[]> {
    return await this.entityManger.query('select * from parking');
  }

  async buscar(id: number): Promise<ParkingDto> {
    return await this.entityManger.query(`select * from parking where id = ${id}`);
  }
}
