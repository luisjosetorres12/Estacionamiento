import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking'
import {ServicioRegistrarTicket} from 'src/dominio/parking/servicio/servicio-registrar-ticket'

export function servicioRegistrarTicketProveedor(repositorioParking: RepositorioParking) {
    return new ServicioRegistrarTicket(repositorioParking)
}