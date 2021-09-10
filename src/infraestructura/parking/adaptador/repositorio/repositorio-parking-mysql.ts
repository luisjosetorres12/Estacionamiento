import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {ParkingDto} from 'src/aplicacion/parking/consulta/dto/parking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {ParkingEntidad} from './../../entidad/parking.entidad';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';


@Injectable()
export class RepositorioParkingMysql implements RepositorioParking {

  constructor(@InjectRepository(ParkingEntidad) private readonly repositorio: Repository<ParkingEntidad>){}

  async registrarTicket(parkigTicket: ParkingEntidad): Promise<ParkingDto>{
    return this.repositorio.save(parkigTicket)
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


  //  // Analizando el metodo. Tarea : 1. Actualizar el ticket.
  //  async actualizarTicket(id: number,parkigTicket: ParkingDto){
  //    let ticket = this.fromDtoToEntity(id, parkigTicket) // Aca transforman de Dto a Entidad
  //    await this.repositorio.save(ticket) // Aca Actualiza
  //    let result: ParkingEntidad[] = await this.repositorio.find({id}) // Busca nuevamente el ticket
  //    let cobrarPorRetraso = this.calcularDemora(result[0].fechaSalida, result[0].fechaSalidaSugerida) // Calcula la demora del ticket
  //    result[0].extraValorPagar += cobrarPorRetraso // Se suma la demora al valor total a pagar
  //    await this.repositorio.save(result[0]) // Se vuelve a actualizar
  //    return result // Se retorna el result en un array
  //  }

}