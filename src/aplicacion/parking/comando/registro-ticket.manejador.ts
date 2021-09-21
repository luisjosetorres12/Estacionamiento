import { Injectable } from '@nestjs/common';
import { ComandoRegistrarTicket } from './registrar-ticket.comando';
import { ServicioRegistrarTicket } from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import { Ticket } from 'src/dominio/parking/modelo/ticket';

@Injectable()
export class ManejadorRegistroTicket {
  constructor(private _servicioRegistrarTicket: ServicioRegistrarTicket) {}

  async ejecutar(comandoRegistrarTicket: ComandoRegistrarTicket) {
    let ticket = new Ticket();
    ticket.tipoVehiculo = comandoRegistrarTicket.tipoVehiculo;
    ticket.idPlan = comandoRegistrarTicket.idPlan;
    ticket.documentoUsuario = comandoRegistrarTicket.documentoUsuario;
    ticket.fechaIngreso = comandoRegistrarTicket.fechaIngreso;
    ticket.matricula = comandoRegistrarTicket.matricula; 
    return await this._servicioRegistrarTicket.ejecutar(ticket);
  }
}
