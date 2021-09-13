import {ParkingDto} from '../../../aplicacion/parking/consulta/dto/parking.dto';
import {RepositorioParking} from '../puerto/repository/repositorio-parking';
import { UtilTicketService } from './servicio-util-ticket';
export class ServicioActualizarTicket {

  constructor(private _repositorio: RepositorioParking,
              private readonly _servicioUtil: UtilTicketService){}

  async ejecutar(id: number,parkingTicket: ParkingDto) {
    let ticket = this._servicioUtil.fromDtoToEntity(id, parkingTicket);
    let ticketResult = await this._servicioUtil.find(id);
    let cobrarPorRetraso = this._servicioUtil.calcularDemora(ticket.fechaSalida, ticketResult.fechaSalidaSugerida);
    ticket.extraValorPagar = ticketResult.extraValorPagar + cobrarPorRetraso;
    return this._repositorio.actualizarTicket(id, ticket);
  }
}