import { Ticket } from '../../modelo/ticket';



export abstract class RepositorioParking {
  abstract registrarTicket(parkigTicket: Ticket);
  abstract actualizarTicket(id: number ,ticket: Ticket);
}
