import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {ServicioRegistrarTicket} from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import { DaoPlanes } from 'src/dominio/parking/puerto/dao/dao-planes';
import { DaoDiasFestivos } from 'src/dominio/parking/puerto/dao/dao-dias-festivos';
import { ServicioFechaTickets } from 'src/dominio/parking/servicio/servicio-fechas-ticket';
import { ServicioValidadorTickets } from 'src/dominio/parking/servicio/servicio-validador-ticket';


export function servicioRegistrarTicketProveedor(
    repositorioParking: RepositorioParking, 
    daoPlanes: DaoPlanes, 
    daoDiasFestivos: DaoDiasFestivos, 
    servicioFechas: ServicioFechaTickets,
    servicioValidador: ServicioValidadorTickets,
    ) {
    return new ServicioRegistrarTicket(
        repositorioParking,
        daoPlanes,
        daoDiasFestivos,
        servicioFechas,
        servicioValidador
    );
}
