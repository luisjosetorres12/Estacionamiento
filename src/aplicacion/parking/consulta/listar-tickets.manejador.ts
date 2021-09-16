import { Injectable } from '@nestjs/common';
import {DaoParking} from 'src/dominio/parking/puerto/dao/dao-parking'
import {ParkingDto} from 'src/aplicacion/parking/consulta/dto/parking.dto'

@Injectable()
export class ManejadorListarTickets {
  
  constructor(private _daoParking: DaoParking) {}

  async ejecutar(page: number): Promise<ParkingDto[]>{
    return await this._daoParking.listar(page)
  }
}