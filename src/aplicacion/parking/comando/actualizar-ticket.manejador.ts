import { Injectable } from '@nestjs/common';
import {ComandoRegistrarTicket} from './registrar-ticket.comando'
import {ParkingDto} from 'src/aplicacion/parking/consulta/dto/parking.dto'
import {ServicioActualizarTicket} from 'src/dominio/parking/servicio/servicio-actualizar-ticket'
@Injectable()
export class ManejadorActualizarTicket {

  constructor(private _actualizarTicket: ServicioActualizarTicket) {}

  async ejecutar(id: number,comandoRegistrarTicket: ComandoRegistrarTicket){
    let ticket = new ParkingDto()
    Object.keys(comandoRegistrarTicket).forEach(key => {
      ticket[key] = comandoRegistrarTicket[key]
    })
    return await this._actualizarTicket.ejecutar(id ,ticket)
  }
}