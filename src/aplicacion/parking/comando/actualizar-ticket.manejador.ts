import { Injectable } from '@nestjs/common';
import {ServicioActualizarTicket} from 'src/dominio/parking/servicio/servicio-actualizar-ticket';
import { ParseService } from '../servicio/parser-service';
import { ComandoActualizarTicket } from './actualizar-ticket.comanto';

@Injectable()
export class ManejadorActualizarTicket {

  constructor(private _actualizarTicket: ServicioActualizarTicket, private _parser: ParseService) {}

  async ejecutar(id: number,ticket: ComandoActualizarTicket){
    return await this._actualizarTicket.ejecutar(id ,this._parser.parserComandoToTicket(ticket));
  }
}
