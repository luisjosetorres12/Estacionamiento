import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param, Put, Query } from '@nestjs/common';
import {ManejadorRegistroTicket} from 'src/aplicacion/parking/comando/registro-ticket.manejador';
import {ComandoRegistrarTicket} from 'src/aplicacion/parking/comando/registrar-ticket.comando';
import {ManejadorListarTickets} from 'src/aplicacion/parking/consulta/listar-tickets.manejador';
import {ParkingDto} from 'src/aplicacion/parking/consulta/dto/parking.dto';
import { ManejadorMostrarTicket } from 'src/aplicacion/parking/consulta/mostrar-ticket.manejador';
import { ManejadorActualizarTicket } from 'src/aplicacion/parking/comando/actualizar-ticket.manejador';
import { ManejadorFiltrarTickets } from 'src/aplicacion/parking/consulta/filtrar-tickets.manejador';

@Controller('parking')
export class ParkingController {

  constructor(private readonly _manejadorRegistroTicket: ManejadorRegistroTicket,
              private readonly _manejadorListarTickets: ManejadorListarTickets,
              private readonly _manejadorMostrarTicket: ManejadorMostrarTicket,
              private readonly _manejadorActualizarTicket: ManejadorActualizarTicket,
              private readonly _manejadorFiltrarTickets: ManejadorFiltrarTickets){}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crearTicket(@Body() comandoRegistrarTicket: ComandoRegistrarTicket): Promise<ParkingDto> {
    return await this._manejadorRegistroTicket.ejecutar(comandoRegistrarTicket);
  }

  @Get()
  async listar(@Query() params: string): Promise<ParkingDto[]>{
    return await this._manejadorListarTickets.ejecutar(+params["page"]);
  }

  @Get('search')
  async filtrar(@Query() queryParams: string){
    return this._manejadorFiltrarTickets.ejecutar(queryParams)
  }

  @Get('/:id')
  async buscar(@Param() params: string) {
    return await this._manejadorMostrarTicket.ejecutar(+params['id']);
  }

  @Put('/:id')
  async actualizar(@Param() params: string, @Body() comandoRegistrarTicket: ComandoRegistrarTicket){
    return this._manejadorActualizarTicket.ejecutar(+params['id'] ,comandoRegistrarTicket);
  }

}
