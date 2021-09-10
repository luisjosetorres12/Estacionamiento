import { InjectEntityManager } from "@nestjs/typeorm";
import { ParkingDto } from "src/aplicacion/parking/consulta/dto/parking.dto";
import { ParkingEntidad } from "src/infraestructura/parking/entidad/parking.entidad";
import { EntityManager } from "typeorm";
import { Parking } from "../modelo/parking";


export class UtilTicketService {

  constructor(@InjectEntityManager() private readonly entityManager: EntityManager){}

  calcularFechaSalida(fechaIngreso, tipoPlan){
    let oldDate = new Date(fechaIngreso)
    let fechaSalidaSugerida: Date;
    let tiempo: number;
    switch (tipoPlan) {
      case 0:
        tiempo = 30
        fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours(), oldDate.getMinutes() + tiempo));
        break;
      case 1:
        tiempo = 1
        fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours() + tiempo, oldDate.getMinutes()));
        break;
      case 2:
        tiempo = 8
        fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours() + tiempo, oldDate.getMinutes()));
        break;
      case 3:
        tiempo = 7
        fechaSalidaSugerida = new Date(oldDate.setDate(oldDate.getDate() + tiempo));
        break;
      case 4:
        tiempo = 1
        fechaSalidaSugerida = new Date(oldDate.setMonth(oldDate.getMonth() + tiempo));
        break;
    }

    return fechaSalidaSugerida;
  }

  fromDtoToEntity(id: number,parkingDto: ParkingDto) {
    let ticket = new ParkingEntidad()
    Object.keys(parkingDto).forEach(key => {
      ticket[key] = parkingDto[key];
    })
    ticket.id = id
    return ticket
   }

   fromModelToEntity(parkingModel: Parking): ParkingEntidad{
    let ticket = new ParkingEntidad()
    ticket.documentoUsuario = parkingModel.documentoUsuario;
    ticket.tipoVehiculo = parkingModel.tipoVehiculo;
    ticket.idPlan = parkingModel.idPlan;
    ticket.fechaIngreso = new Date(parkingModel.fechaIngreso);
    ticket.matricula = parkingModel.matricula;
    return ticket
   }

   fromEntityToDto(parkingEntity: ParkingEntidad) {
    let ticket = new ParkingDto()
    Object.keys(parkingEntity).forEach(key => {
      ticket[key] = parkingEntity[key];
    })
    return ticket
   }

   async valorAPagarPorPlan(tipoPlan: number): Promise<number> {
    let result = await this.entityManager.query(`select * from planes where id = ${tipoPlan}`)
    return result[0].valorPagar;
   }

   async cantidadDiasFestivos(fechaIngreso: Date, fechaSalida: Date) {
    let maxLength = 19;
    let startDate = fechaIngreso.toISOString().split('T').join(' ').substring(0,maxLength);
    let endDate = fechaSalida.toISOString().split('T').join(' ').substring(0,maxLength);
    return await this.entityManager.query(`select * from colombia_holidays where diaCelebracion >= '${startDate}' and diaCelebracion <= '${endDate}'`);
  }

  calcularDemora(fechaSalida: Date, fechaSalidaSugerida: Date): number {
    if (new Date(fechaSalidaSugerida).valueOf() > new Date(fechaSalida).valueOf()) {
      return 0
    }
   let milisegundos:number = Math.abs(new Date(fechaSalidaSugerida).valueOf() - new Date(fechaSalida).valueOf())
   let minutos = milisegundos / 1000 / 60
   return minutos * 250
  }

}