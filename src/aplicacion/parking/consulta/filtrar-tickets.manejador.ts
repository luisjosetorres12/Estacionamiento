import { Injectable } from '@nestjs/common';
import { DaoParking } from 'src/dominio/parking/puerto/dao/dao-parking';

@Injectable()
export class ManejadorFiltrarTickets {

  constructor(private _daoParking: DaoParking) {}

  async ejecutar(queryParams: {}){
    return this._daoParking.filtrar(queryParams);
  }
}
