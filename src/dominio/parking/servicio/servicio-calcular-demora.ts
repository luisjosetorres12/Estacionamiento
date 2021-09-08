import {ParkingDto} from '../../../aplicacion/parking/consulta/dto/parking.dto'
export class ServicioCalcularDemora{
  
  ejecutar(parkingTicket: ParkingDto): number {
    let milisegundos:number = Math.abs(new Date(parkingTicket.fechaSalidaSugerida).valueOf() - new Date(parkingTicket.fechaSalida).valueOf())
    let minutos = milisegundos / 1000 / 60
    return minutos * 250
  }
}