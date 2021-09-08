import { Injectable } from "@nestjs/common";
import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking'
import {ParkingDto} from './dto/parking.dto'

@Injectable()
export class ManejadorListarTicketsPorUsuario {
  
  constructor(private _parkingRepositorio: RepositorioParking) {}

  async ejecutar(documentoUsuario: string): Promise<ParkingDto[]> {
    return await this._parkingRepositorio.registrosPorUsuario(documentoUsuario)
  }
}