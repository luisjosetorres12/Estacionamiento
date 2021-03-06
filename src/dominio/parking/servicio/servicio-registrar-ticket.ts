import { Ticket } from '../modelo/ticket';
import {RepositorioParking} from '../puerto/repository/repositorio-parking';
import { DaoPlanes } from '../puerto/dao/dao-planes';
import { DaoDiasFestivos } from '../puerto/dao/dao-dias-festivos';
import { ServicioFechaTickets } from './servicio-fechas-ticket';
import { ServicioValidadorTickets } from './servicio-validador-ticket';
const RECARGO_DIAS_FESTIVOS = 0.035;

export class ServicioRegistrarTicket {

  constructor(private readonly _repositorioParking: RepositorioParking,
              private readonly _daoPlanes: DaoPlanes,
              private readonly _daoDiasFestivos: DaoDiasFestivos,
              private readonly _servicioFechas: ServicioFechaTickets,
              private readonly _servicioValidador: ServicioValidadorTickets, ){}

  async ejecutar(parkingTicket: Ticket) {
    this._servicioValidador.validarTipoPlan(parkingTicket.idPlan);
    this._servicioValidador.validarTipoVehiculo(parkingTicket.tipoVehiculo);
    this._servicioValidador.validarDiasHabiles(parkingTicket.fechaIngreso);
    parkingTicket.valorPagar = await this._daoPlanes.valorAPagarPorPlan(parkingTicket.idPlan, parkingTicket.tipoVehiculo);
    parkingTicket.fechaSalidaSugerida = this._servicioFechas.calcularFechaSalida(parkingTicket.fechaIngreso, parkingTicket.idPlan);
    let diasFestivos =  await this._daoDiasFestivos.cantidadDiasFestivos(parkingTicket.fechaIngreso,parkingTicket.fechaSalidaSugerida);
    if(diasFestivos.length > 0) {
      parkingTicket.extraValorPagar = parkingTicket.valorPagar * RECARGO_DIAS_FESTIVOS;
    }
    return this._repositorioParking.registrarTicket(parkingTicket);
  }
}
