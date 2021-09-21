import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param, Put, Query } from '@nestjs/common';
import {ManejadorRegistroTicket} from 'src/aplicacion/parking/comando/registro-ticket.manejador';
import {ComandoRegistrarTicket} from 'src/aplicacion/parking/comando/registrar-ticket.comando';
import {ManejadorListarTickets} from 'src/aplicacion/parking/consulta/listar-tickets.manejador';
import {ParkingDto} from 'src/aplicacion/parking/consulta/dto/parking.dto';
import { ManejadorMostrarTicket } from 'src/aplicacion/parking/consulta/mostrar-ticket.manejador';
import { ManejadorActualizarTicket } from 'src/aplicacion/parking/comando/actualizar-ticket.manejador';
import { ManejadorFiltrarTickets } from 'src/aplicacion/parking/consulta/filtrar-tickets.manejador';
import { ComandoActualizarTicket } from 'src/aplicacion/parking/comando/actualizar-ticket.comanto';

@Controller('parking')
export class ParkingController {

  constructor(private readonly _manejadorRegistroTicket: ManejadorRegistroTicket,
              private readonly _manejadorListarTickets: ManejadorListarTickets,
              private readonly _manejadorMostrarTicket: ManejadorMostrarTicket,
              private readonly _manejadorFiltrarTickets: ManejadorFiltrarTickets,
              private readonly _manejadorActualizarTicket: ManejadorActualizarTicket){}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crearTicket(@Body() comandoRegistrarTicket: ComandoRegistrarTicket): Promise<ParkingDto> {
    return this._manejadorRegistroTicket.ejecutar(comandoRegistrarTicket);
  }

  @Get()
  async listar(@Query() params: string): Promise<ParkingDto[]>{
    return this._manejadorListarTickets.ejecutar(+params['page']);
  }

  @Get('search')
  async filtrar(@Query() queryParams: string){
    return this._manejadorFiltrarTickets.ejecutar(queryParams);
  }

  @Get('/:id')
  async buscar(@Param() params: string) {
    return this._manejadorMostrarTicket.ejecutar(+params['id']);
  }

   @Put('/:id')
   async actualizar(@Param() params: string, @Body() body: ComandoActualizarTicket){
    return this._manejadorActualizarTicket.ejecutar(+params['id'] ,body);
   }

}
