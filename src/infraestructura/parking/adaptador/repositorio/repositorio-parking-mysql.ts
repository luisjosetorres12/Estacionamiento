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
    return this.repositorio.save(parkigTicket);
  }

  async actualizarTicket(id: number,parkigTicket: ParkingEntidad): Promise<ParkingDto>{
    return this.repositorio.save(parkigTicket);
  }
}
