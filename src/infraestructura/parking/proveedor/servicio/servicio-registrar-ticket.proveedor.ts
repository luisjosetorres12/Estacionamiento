import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {ServicioRegistrarTicket} from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import { UtilTicketService } from 'src/dominio/parking/servicio/servicio-util-ticket';

export function servicioRegistrarTicketProveedor(repositorioParking: RepositorioParking, utilTicketService: UtilTicketService) {
    return new ServicioRegistrarTicket(repositorioParking, utilTicketService)
}