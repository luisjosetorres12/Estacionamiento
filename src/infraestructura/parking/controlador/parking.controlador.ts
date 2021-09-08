import { Body, Controller, Get, Post, UsePipes, ValidationPipe, Param, Put } from '@nestjs/common';
import {ManejadorRegistroTicket} from 'src/aplicacion/parking/comando/registro-ticket.manejador'
import {ComandoRegistrarTicket} from 'src/aplicacion/parking/comando/registrar-ticket.comando'
import {ManejadorListarTickets} from 'src/aplicacion/parking/consulta/listar-tickets.manejador'
import {ManejadorListarTicketsPorUsuario} from 'src/aplicacion/parking/consulta/listar-tickets-usuario.manejador'
import {ManejadorListarTicketsPorTipoVehiculo} from 'src/aplicacion/parking/consulta/listar-tickets-vehiculo.manejador'
import {ManejadorListarTicketsPorPlan} from 'src/aplicacion/parking/consulta/listar-tickets-plan.manejador'
import {ParkingDto} from 'src/aplicacion/parking/consulta/dto/parking.dto'

@Controller('parking')
export class ParkingController {

  constructor(private readonly _manejadorRegistroTicket: ManejadorRegistroTicket,
              private readonly _manejadorListarTickets: ManejadorListarTickets,
              private readonly _namejadorListarTicketsUsuario: ManejadorListarTicketsPorUsuario,
              private readonly _manejadorListarTickesVehiculo: ManejadorListarTicketsPorTipoVehiculo,
              private readonly _manejadorListarTickesPlan: ManejadorListarTicketsPorPlan){}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  async crearTicket(@Body() comandoRegistrarTicket: ComandoRegistrarTicket) {
    return await this._manejadorRegistroTicket.ejecutar(comandoRegistrarTicket)
  }

  @Get()
  async listar(): Promise<ParkingDto[]>{
    return await this._manejadorListarTickets.ejecutar()
  }

  @Get('byUser/:id')
  async listarPorUsuario(@Param() params: String): Promise<ParkingDto[]>{
    return await this._namejadorListarTicketsUsuario.ejecutar(params["id"])
  }

  @Get('byVehicleType/:id')
  async listarPorTipoVehiculo(@Param() params: String): Promise<ParkingDto[]> {
    return await this._manejadorListarTickesVehiculo.ejecutar(+params["id"])
  }

  @Get('byPlan/:id')
  async listarPorTipoPlan(@Param() params: String) {
    return await this._manejadorListarTickesPlan.ejecutar(+params["id"])
  }

  @Put('/:id')
  async actualizar(@Param() params: string, @Body() comandoRegistrarTicket: ComandoRegistrarTicket) {
    console.log(params["id"])
    return comandoRegistrarTicket
  }
}
