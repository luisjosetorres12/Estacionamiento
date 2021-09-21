import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {ParkingDto} from 'src/aplicacion/parking/consulta/dto/parking.dto';
import { InjectRepository } from '@nestjs/typeorm';
import {ParkingEntidad} from './../../entidad/parking.entidad';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { Ticket } from 'src/dominio/parking/modelo/ticket'
import { ParseService } from 'src/aplicacion/parking/servicio/parser-service';

@Injectable()
export class RepositorioParkingMysql implements RepositorioParking {

  constructor(@InjectRepository(ParkingEntidad) private readonly repositorio: Repository<ParkingEntidad>,
              private parser: ParseService){}

  async registrarTicket(parkigTicket: Ticket): Promise<ParkingDto>{
    let result = await this.repositorio.save(parkigTicket);
    return this.repositorio.findOne(result.id);
  }

  async actualizarTicket(id: number,parkigTicket: Ticket): Promise<UpdateResult>{
    let params = this.parser.generateObjectToUpdate(parkigTicket)
    let result = await this.repositorio.update({
      id: id
    },params);

    return result;
  }


}
