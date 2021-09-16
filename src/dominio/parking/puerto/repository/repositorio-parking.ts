import { ParkingEntidad } from 'src/infraestructura/parking/entidad/parking.entidad';
import { ParkingDto } from '../../../../aplicacion/parking/consulta/dto/parking.dto';


export abstract class RepositorioParking {
  
  abstract registrarTicket(parkigTicket: ParkingEntidad): Promise<ParkingDto>;
  abstract actualizarTicket(id: number ,ticket: ParkingEntidad): Promise<ParkingDto>;
}
