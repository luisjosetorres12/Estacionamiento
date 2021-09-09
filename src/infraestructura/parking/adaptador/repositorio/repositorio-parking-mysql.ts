import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {ParkingDto} from 'src/aplicacion/parking/consulta/dto/parking.dto';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import {Parking} from 'src/dominio/parking/modelo/parking';
import {ParkingEntidad} from './../../entidad/parking.entidad';
import { Repository, EntityManager } from 'typeorm';
import { Injectable } from '@nestjs/common';


@Injectable()
export class RepositorioParkingMysql implements RepositorioParking {

  constructor(@InjectRepository(ParkingEntidad) private readonly repositorio: Repository<ParkingEntidad>,
              @InjectEntityManager() private readonly entityManager: EntityManager){}

  async registrarTicket(parkigTicket: Parking): Promise<ParkingDto>{
    let ticket = this.fromModelToEntity(parkigTicket)
    ticket.valorPagar =  await this.valorAPagar(ticket.idPlan)
    let result = this.fromEntityToDto(await this.repositorio.save(ticket))
    let diasFestivos =  await this.valorDiasFestivos(result.fechaIngreso, result.fechaSalidaSugerida)

     if(diasFestivos.length > 0) {
      ticket.extraValorPagar = ticket.valorPagar * 0.035
      ticket.id = result.id
      result = this.fromEntityToDto(await this.repositorio.save(ticket))
     }
    return result
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

  async valorDiasFestivos(fechaIngreso: Date, fechaSalida: Date) {
    let maxLength = 19;
    let startDate = fechaIngreso.toISOString().split('T').join(' ').substring(0,maxLength);
    let endDate = fechaSalida.toISOString().split('T').join(' ').substring(0,maxLength);
    return await this.entityManager.query(`select * from colombia_holidays where diaCelebracion >= '${startDate}' and diaCelebracion <= '${endDate}'`);
     
  }

   async actualizarTicket(id: number,parkigTicket: ParkingDto){
     let ticket = this.fromDtoToEntity(id, parkigTicket)
     await this.repositorio.save(ticket)
     let result: ParkingEntidad[] = await this.repositorio.find({id})
     let cobrarPorRetraso = this.calcularDemora(result[0].fechaSalida, result[0].fechaSalidaSugerida)
     result[0].extraValorPagar += cobrarPorRetraso
     await this.repositorio.save(result[0])
     return result
   }

   async valorAPagar(tipoPlan: number): Promise<number> {
    let result = await this.entityManager.query(`select * from planes where id = ${tipoPlan}`)
    return result[0].valorPagar
   }

   calcularDemora(fechaSalida: Date, fechaSalidaSugerida: Date): number {
     if (new Date(fechaSalidaSugerida).valueOf() > new Date(fechaSalida).valueOf()) {
       return 0
     }
    let milisegundos:number = Math.abs(new Date(fechaSalidaSugerida).valueOf() - new Date(fechaSalida).valueOf())
    let minutos = milisegundos / 1000 / 60
    return minutos * 250
   }
   
   fromEntityToDto(parkingEntity: ParkingEntidad) {
    let ticket = new ParkingDto()
    Object.keys(parkingEntity).forEach(key => {
      ticket[key] = parkingEntity[key]
    })
    return ticket
   }

   fromDtoToEntity(id: number,parkingDto: ParkingDto) {
    let ticket = new ParkingEntidad()
    Object.keys(parkingDto).forEach(key => {
      ticket[key] = parkingDto[key]
    })
    ticket.id = id
    return ticket
   }

   fromModelToEntity(parkingModel: Parking){
    let ticket = new ParkingEntidad()
    ticket.documentoUsuario = parkingModel.documentoUsuario
    ticket.tipoVehiculo = parkingModel.tipoVehiculo
    ticket.idPlan = parkingModel.idPlan
    ticket.fechaIngreso = new Date(parkingModel.fechaIngreso)
    ticket.matricula = parkingModel.matricula
    return ticket
   }
}