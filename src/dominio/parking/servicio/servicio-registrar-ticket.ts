import { Parking } from '../modelo/parking';
import {RepositorioParking} from '../puerto/repository/repositorio-parking';
export class ServicioRegistrarTicket {

  constructor(private readonly _repositorioParking: RepositorioParking){}

  async ejecutar(parkingTicket: Parking) {
    return await this._repositorioParking.registrarTicket(parkingTicket)
  }
}
