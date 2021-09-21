import { ErrorDiaInvalido } from "src/dominio/errores/error-dia-invalido";
import { ErrorTipoPlan } from "src/dominio/errores/error-tipo-plan";
import { ErrorTipoVehiculo } from "src/dominio/errores/error-tipo-vehiculo";

enum TIPO_VEHICULO {
  motocicleta = 0,
  carro = 1,
}

enum TIPO_PLAN { 
  MEDIA_HORA = 0,
  UNA_HORA = 1,
  OCHO_HORAS = 2,
  UNA_SEMANA = 3,
  UN_MES = 4
}

const SABADO = 6;
const DOMINGO = 0;

export class ServicioValidadorTickets {
  
  validarTipoVehiculo(tipoVehiculo: number) {
    if (tipoVehiculo !== TIPO_VEHICULO.carro && tipoVehiculo !== TIPO_VEHICULO.motocicleta ) {
      throw new ErrorTipoVehiculo('Tipo de vehiculo Invalido');
    }
  }

  validarTipoPlan(tipoPlan: number) {
    if (!Object.values(TIPO_PLAN).includes(tipoPlan)) {
      throw new ErrorTipoPlan('Tipo de plan Invalido');
    }
  }

  validarDiasHabiles(fechaIngreso: Date){
    if (new Date(fechaIngreso).getDay() === SABADO || new Date(fechaIngreso).getDay() === DOMINGO) {
      throw new ErrorDiaInvalido('Fecha Invalida, no se puede registrar pedidos los fines de semana');
    }
  }
}
