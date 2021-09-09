import { Injectable } from '@nestjs/common';
import {ComandoRegistrarTicket} from './registrar-ticket.comando';
import {ServicioRegistrarTicket} from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import {Parking} from 'src/dominio/parking/modelo/parking';

@Injectable()
export class ManejadorRegistroTicket {
  constructor(private _servicioRegistrarTicket: ServicioRegistrarTicket) {}

  async ejecutar(comandoRegistrarTicket: ComandoRegistrarTicket) {
    return await this._servicioRegistrarTicket.ejecutar(new Parking(
      comandoRegistrarTicket.tipoVehiculo,
      comandoRegistrarTicket.idPlan,
      comandoRegistrarTicket.documentoUsuario,
      comandoRegistrarTicket.fechaIngreso,
      comandoRegistrarTicket.matricula
    ))
  }
}