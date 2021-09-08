import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking'
import {ParkingDto} from 'src/aplicacion/parking/consulta/dto/parking.dto'
import { InjectRepository } from '@nestjs/typeorm';
import {Parking} from 'src/dominio/parking/modelo/parking'
import {ParkingEntidad} from './../../entidad/parking.entidad'
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';

@Injectable()
export class RepositorioParkingMysql implements RepositorioParking {

  constructor(@InjectRepository(ParkingEntidad) private readonly repositorio: Repository<ParkingEntidad>,
              @InjectEntityManager() private readonly entityManager: EntityManager){}

  async registrarTicket(parkigTicket: Parking){
    let ticket = new ParkingEntidad()

    ticket.documentoUsuario = parkigTicket.documentoUsuario
    ticket.tipoVehiculo = parkigTicket.tipoVehiculo
    ticket.idPlan = parkigTicket.idPlan
    ticket.fechaIngreso = new Date(parkigTicket.fechaIngreso)
    ticket.fechaSalida = new Date(parkigTicket.fechaSalida)
    ticket.fechaSalidaSugerida = new Date(parkigTicket.fechaSalidaSugerida)
    ticket.matricula = parkigTicket.matricula
    await this.repositorio.save(ticket)
  }

  async registrosPorUsuario(documentoUsuario: string): Promise<ParkingDto[]>{
    return await this.repositorio.find({documentoUsuario})
  }

  async registrosPorTipoVehiculo(tipoVehiculo: number): Promise<ParkingDto[]> {
    return await this.repositorio.find({tipoVehiculo})
  }

  async registrosPorTipoPlan(idPlan: number): Promise<ParkingDto[]>{
    return await this.repositorio.find({idPlan})
  }

  validarDiasFestivos(fechaIngreso: Date, fechaSalida: Date) {
    return this.entityManager.query(`select * from colombia_holidays where diaCelebracion >= ${fechaIngreso} and diaCelebracion <= ${fechaSalida}`)
  }
}