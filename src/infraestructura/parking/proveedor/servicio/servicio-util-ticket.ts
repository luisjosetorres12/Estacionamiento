import { UtilTicketService } from 'src/dominio/parking/servicio/servicio-util-ticket';
import { EntityManager } from 'typeorm';

export function UtilTicketServiceProveedor(entityManager: EntityManager){
    return new UtilTicketService(entityManager)
}
