import { ParkingEntidad } from 'src/infraestructura/parking/entidad/parking.entidad';
import {ParkingDto} from '../../../../aplicacion/parking/consulta/dto/parking.dto';
import { Parking } from '../../modelo/parking';

export abstract class RepositorioParking {
  
  abstract registrarTicket(parkigTicket: ParkingEntidad): Promise<ParkingDto>
  abstract registrosPorUsuario(documentoUsuario: string): Promise<ParkingDto[]>
  abstract registrosPorTipoVehiculo(tipoVehiculo: number): Promise<ParkingDto[]>
  abstract registrosPorTipoPlan(idPlan: number): Promise<ParkingDto[]>
  abstract actualizarTicket(id: number ,ticket: ParkingEntidad): Promise<ParkingDto>
}