
import {DaoParking} from '../../../../dominio/parking/puerto/dao/dao-parking';
import {ParkingDto} from '../../../../aplicacion/parking/consulta/dto/parking.dto';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';

const LIMITE_QUERY = 1;
const OFFSET_VALUE = 10;

@Injectable()
export class DaoParkingMysql implements DaoParking{

  constructor(@InjectEntityManager() private readonly entityManger: EntityManager){}

  async listar(page: number): Promise<ParkingDto[]> {
    return await this.entityManger.query(`select * from parking order by id desc limit 10 offset ${page * 10}`);
  }

  async buscar(id: number): Promise<ParkingDto> {
    return await this.entityManger.query(`select * from parking where id = ${id}`);
  }

  async filtrar(queryParams: {}): Promise<ParkingDto[]>{
    let query = this.crearQuery(queryParams);
    return this.entityManger.query(query);
  }

  crearQuery(queryParams: {}): string {
    let query = "select * from parking where ";
    let keys = Object.keys(queryParams);
    keys.forEach((key, index) => {
      if(key !== "page") {
        index !== keys.length - LIMITE_QUERY ? query += `${key} = ${queryParams[key]} AND ` : query += `${key} = ${queryParams[key]} `;
      }
    })

    if(keys.includes('page')) {
      query += `limit 10 offset ${queryParams['page'] * OFFSET_VALUE}`;
    }
    return query;
  }
}
