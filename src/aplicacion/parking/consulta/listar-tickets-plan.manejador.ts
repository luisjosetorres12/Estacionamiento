import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking'
import {ParkingDto} from './dto/parking.dto'
import { Injectable } from "@nestjs/common";

@Injectable()
export class ManejadorListarTicketsPorPlan {

  constructor(private _repositorioParking: RepositorioParking) {}

  async ejecutar(idPlan: number): Promise<ParkingDto[]>{
    return await this._repositorioParking.registrosPorTipoPlan(idPlan)
  }
}
