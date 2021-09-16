import { Module } from '@nestjs/common';
import {daoParkingProvidier} from './dao/dao-parking.proveedor';
import {DaoParking} from 'src/dominio/parking/puerto/dao/dao-parking';
import {repositoryParkingProvidier} from './repositorio/repositorio-parking.proveedor';
import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {ParkingEntidad} from '../entidad/parking.entidad';
import { TypeOrmModule } from '@nestjs/typeorm';
import {ServicioRegistrarTicket} from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import {servicioRegistrarTicketProveedor} from './servicio/servicio-registrar-ticket.proveedor';
import {ManejadorRegistroTicket} from 'src/aplicacion/parking/comando/registro-ticket.manejador';
import {ManejadorListarTickets} from 'src/aplicacion/parking/consulta/listar-tickets.manejador';
import { ManejadorMostrarTicket } from 'src/aplicacion/parking/consulta/mostrar-ticket.manejador';
import { ManejadorActualizarTicket } from 'src/aplicacion/parking/comando/actualizar-ticket.manejador';
import { ServicioActualizarTicket } from 'src/dominio/parking/servicio/servicio-actualizar-ticket';
import { servicioActualizarTicketProveedor } from './servicio/servicio-actualizar-ticket.proveedor';
import { UtilTicketService } from 'src/dominio/parking/servicio/servicio-util-ticket';
import { ManejadorFiltrarTickets } from 'src/aplicacion/parking/consulta/filtrar-tickets.manejador';

@Module({

  imports: [TypeOrmModule.forFeature([ParkingEntidad])],
  providers:[
    {provide: ServicioRegistrarTicket, inject:[RepositorioParking, UtilTicketService], useFactory: servicioRegistrarTicketProveedor},
    {provide: ServicioActualizarTicket, inject:[RepositorioParking, UtilTicketService], useFactory: servicioActualizarTicketProveedor},
    daoParkingProvidier,
    repositoryParkingProvidier,
    ManejadorRegistroTicket,
    ManejadorListarTickets,
    ManejadorMostrarTicket,
    ManejadorActualizarTicket,
    ManejadorFiltrarTickets,
    UtilTicketService
  ],
  exports:[
    DaoParking,
    RepositorioParking,
    ManejadorRegistroTicket,
    ManejadorListarTickets,
    ManejadorMostrarTicket,
    ManejadorActualizarTicket,
    ManejadorFiltrarTickets
  ]
})

export class ParkingProveedorModule {

}
