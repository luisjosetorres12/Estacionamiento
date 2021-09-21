import { Ticket } from 'src/dominio/parking/modelo/ticket';
import { ComandoActualizarTicket } from '../comando/actualizar-ticket.comanto';


const STATUS_FINISH = 1;
export class ParseService {
  
  parserComandoToTicket(comando: ComandoActualizarTicket) {
    let ticket = new Ticket();

    if(comando.documentoUsuario) ticket.documentoUsuario = comando.documentoUsuario;

    if(comando.idPlan) ticket.idPlan = comando.idPlan;

    if(comando.matricula) ticket.matricula = comando.matricula;

    if(comando.tipoVehiculo) ticket.tipoVehiculo = comando.tipoVehiculo;

    if(comando.fechaSalida) {
      ticket.fechaSalida = comando.fechaSalida;
      ticket.status = STATUS_FINISH;
    }

    return ticket;
  }

  generateObjectToUpdate(parkigTicket: Ticket): object{
    let object = {};
    if (parkigTicket.fechaSalida) object['fechaSalida'] = parkigTicket.fechaSalida;
    if (parkigTicket.fechaIngreso) object['fechaIngreso'] = parkigTicket.fechaIngreso;
    if (parkigTicket.documentoUsuario) object['documentoUsuario'] = parkigTicket.documentoUsuario;
    if (parkigTicket.tipoVehiculo) object['tipoVehiculo'] = parkigTicket.tipoVehiculo;
    if (parkigTicket.matricula) object['matricula'] = parkigTicket.matricula;
    if (parkigTicket.idPlan) object['idPlan'] = parkigTicket.idPlan;
    return object;
  }
}
