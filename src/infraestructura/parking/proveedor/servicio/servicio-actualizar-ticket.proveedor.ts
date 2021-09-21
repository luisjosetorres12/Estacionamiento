import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {ServicioActualizarTicket} from 'src/dominio/parking/servicio/servicio-actualizar-ticket';


export function servicioActualizarTicketProveedor(repositorioParking: RepositorioParking) {
    return new ServicioActualizarTicket(repositorioParking);
}
