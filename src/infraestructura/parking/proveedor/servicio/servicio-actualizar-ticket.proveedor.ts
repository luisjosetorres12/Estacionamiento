import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {ServicioActualizarTicket} from 'src/dominio/parking/servicio/servicio-actualizar-ticket';
import { UtilTicketService } from 'src/dominio/parking/servicio/servicio-util-ticket';

export function servicioActualizarTicketProveedor(repositorioParking: RepositorioParking, utilService: UtilTicketService) {
    return new ServicioActualizarTicket(repositorioParking, utilService)
}