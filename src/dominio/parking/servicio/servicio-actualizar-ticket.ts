import { ParkingDto } from '../../../aplicacion/parking/consulta/dto/parking.dto';
import { Ticket } from '../modelo/ticket';
import {RepositorioParking} from '../puerto/repository/repositorio-parking';
export class ServicioActualizarTicket {

  constructor(private _repositorio: RepositorioParking){}

  async ejecutar(id: number ,parkingTicket: Ticket) {
    return this._repositorio.actualizarTicket(id ,parkingTicket);
  }
}
