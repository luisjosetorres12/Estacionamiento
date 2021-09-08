import {ParkingDto} from '../../../../aplicacion/parking/consulta/dto/parking.dto'
import { Parking } from '../../modelo/parking'

export abstract class RepositorioParking {
  
  abstract registrarTicket(parkigTicket: ParkingDto)
  abstract validarDiasFestivos(fechaIngreso: Date,fechaSalida: Date )
  abstract registrosPorUsuario(documentoUsuario: string): Promise<ParkingDto[]>
  abstract registrosPorTipoVehiculo(tipoVehiculo: number): Promise<ParkingDto[]>
  abstract registrosPorTipoPlan(idPlan: number): Promise<ParkingDto[]>
}