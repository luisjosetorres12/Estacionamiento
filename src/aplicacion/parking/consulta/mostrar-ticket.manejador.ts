import { Injectable } from '@nestjs/common';
import {DaoParking} from 'src/dominio/parking/puerto/dao/dao-parking';
import {ParkingDto} from 'src/aplicacion/parking/consulta/dto/parking.dto';

@Injectable()
export class ManejadorMostrarTicket {
  
  constructor(private _daoParking: DaoParking) {}

  async ejecutar(id: number): Promise<ParkingDto>{
    return await this._daoParking.buscar(id);
  }
}
