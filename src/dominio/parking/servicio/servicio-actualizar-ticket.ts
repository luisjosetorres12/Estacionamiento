import {ParkingDto} from '../../../aplicacion/parking/consulta/dto/parking.dto';
import {RepositorioParking} from '../puerto/repository/repositorio-parking';
export class ServicioActualizarTicket {

  constructor(private _repositorio: RepositorioParking){}

  ejecutar(id: number,parkingTicket: ParkingDto) {
    // return this._repositorio.actualizarTicket(id, parkingTicket)
  }
}