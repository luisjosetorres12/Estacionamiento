import { Injectable } from '@nestjs/common';
import {DaoParking} from 'src/dominio/parking/puerto/dao/dao-parking';
import { ServicioFechaTickets } from 'src/dominio/parking/servicio/servicio-fechas-ticket';
import { TicketSearchDto } from './dto/ticket-search.dto';


@Injectable()
export class ManejadorMostrarTicket {
  
  constructor(private _daoParking: DaoParking, private servicioFechas: ServicioFechaTickets) {}

  async ejecutar(id: number): Promise<TicketSearchDto>{
    let ticket =  await this._daoParking.buscar(id);
    if(!ticket[0].fechaSalida) {
      ticket[0].extraValorPagar = this.servicioFechas.calcularDemora(new Date(),ticket[0].fechaSalidaSugerida)
    }
    return ticket;
  }
}
