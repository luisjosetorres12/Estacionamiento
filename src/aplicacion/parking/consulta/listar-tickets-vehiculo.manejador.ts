import { Get, Injectable } from "@nestjs/common";
import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking'
import {ParkingDto} from './dto/parking.dto'

@Injectable()
export class ManejadorListarTicketsPorTipoVehiculo { 

  constructor(private _repositoryParking: RepositorioParking) {}

  async ejecutar(tipoVehiculo: number): Promise<ParkingDto[]> {
    return await this._repositoryParking.registrosPorTipoVehiculo(tipoVehiculo)
  }
}
