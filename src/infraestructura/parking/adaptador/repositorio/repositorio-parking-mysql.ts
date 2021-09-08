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

  async registrarTicket(parkigTicket: Parking): Promise<ParkingDto>{
    let ticket = this.fromModelToEntity(parkigTicket)
    return this.fromEntityToDto(await this.repositorio.save(ticket))
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

   async actualizarTicket(id: number,parkigTicket: Parking){
    //  let result = await this.repositorio.update({id},parkigTicket)
    //  return new Parking(result)
   }
   
   fromEntityToDto(parkingEntity: ParkingEntidad) {
    let ticket = new ParkingDto()
    Object.keys(parkingEntity).forEach(key => {
      ticket[key] = parkingEntity[key]
    })
    return ticket
   }

   fromModelToEntity(parkingModel: Parking){
    let ticket = new ParkingEntidad()
    ticket.documentoUsuario = parkingModel.documentoUsuario
    ticket.tipoVehiculo = parkingModel.tipoVehiculo
    ticket.idPlan = parkingModel.idPlan
    ticket.fechaIngreso = new Date(parkingModel.fechaIngreso)
    ticket.fechaSalida = new Date(parkingModel.fechaSalida)
    ticket.fechaSalidaSugerida = new Date(parkingModel.fechaSalidaSugerida)
    ticket.matricula = parkingModel.matricula
    return ticket
   }
}