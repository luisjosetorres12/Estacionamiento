import { Parking } from '../modelo/parking';
import {RepositorioParking} from '../puerto/repository/repositorio-parking';
import { UtilTicketService } from './servicio-util-ticket';

/** Todo:
 * 
 * 2. El status tampoco se hace aca y esto tambien lo hace dificil de testear. Mover esto al servicio o al modelo.
 */
export class ServicioRegistrarTicket {

  constructor(private readonly _repositorioParking: RepositorioParking,
              private readonly _servicioUtil: UtilTicketService ){}

  async ejecutar(parkingTicket: Parking) {
    let ticketEntidad = this._servicioUtil.fromModelToEntity(parkingTicket)
    ticketEntidad.valorPagar = await this._servicioUtil.valorAPagarPorPlan(ticketEntidad.idPlan)
    ticketEntidad.fechaSalidaSugerida = this._servicioUtil.calcularFechaSalida(ticketEntidad.fechaIngreso, ticketEntidad.idPlan)
    let diasFestivos =  await this._servicioUtil.cantidadDiasFestivos(ticketEntidad.fechaIngreso,ticketEntidad.fechaSalidaSugerida)
    if(diasFestivos.length > 0) {
      ticketEntidad.extraValorPagar = ticketEntidad.valorPagar * 0.035
    }
    return await this._repositorioParking.registrarTicket(ticketEntidad)
  }
}
