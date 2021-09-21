import * as planes from '../modelo/planes';

const MILESIMAS_POR_SEGUDO = 1000;
const SEGUNDOS_POR_MINUTO = 1000;
const VALOR_MINUTO_RETRASO = 250;

export class ServicioFechaTickets {
  
  calcularDemora(fechaSalida: Date, fechaSalidaSugerida: Date): number {
    if (new Date(fechaSalidaSugerida).valueOf() > new Date(fechaSalida).valueOf()) {
      return 0;
    }
   let milisegundos:number = Math.abs(new Date(fechaSalidaSugerida).valueOf() - new Date(fechaSalida).valueOf());
   let minutos = milisegundos / MILESIMAS_POR_SEGUDO / SEGUNDOS_POR_MINUTO;
   return minutos * VALOR_MINUTO_RETRASO;
  }

  calcularFechaSalida(fechaIngreso: Date, tipoPlan: number){
    let oldDate = new Date(fechaIngreso);
    let fechaSalidaSugerida: Date;
    switch (tipoPlan) {
      case planes.PLAN_MEDIA_HORA:
        fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours(), oldDate.getMinutes() + planes.TREINTA_MINUTOS));
        break;
      case planes.PLAN_UNA_HORA:
        fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours() + planes.UNA_HORA, oldDate.getMinutes()));
        break;
      case planes.PLAN_OCHO_HORAS:
        fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours() + planes.OCHO_HORAS, oldDate.getMinutes()));
        break;
      case planes.PLAN_UNA_SEMANA:
        fechaSalidaSugerida = new Date(oldDate.setDate(oldDate.getDate() + planes.UNA_SEMANA));
        break;
      case planes.PLAN_UN_MES:
        fechaSalidaSugerida = new Date(oldDate.setMonth(oldDate.getMonth() + planes.UN_MES));
        break;
    }

    return fechaSalidaSugerida;
  }
}
