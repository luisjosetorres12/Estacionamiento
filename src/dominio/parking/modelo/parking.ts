import { ErrorDiaInvalido } from 'src/dominio/errores/error-dia-invalido';
import { ErrorTipoPlan } from 'src/dominio/errores/error-tipo-plan';
import { ErrorTipoVehiculo } from 'src/dominio/errores/error-tipo-vehiculo';

const TIPO_PLAN = [{name: '30_Minutos', id: 0},
                   {name: '1_Hora', id: 1},
                   {name: '8_Horas', id: 2},
                   {name: 'Semana', id: 3},
                   {name: 'Mes', id: 4}
                  ];

const TIPO_VEHICULO = [{name: 'Motocicleta', id: 0}, 
                       {name: 'Carro', id: 1}
                      ];

const STATUS  = [0,1];

export class Parking {

  readonly #tipoVehiculo;
  readonly #idPlan;
  readonly #documentoUsuario;
  readonly #fechaIngreso;
  readonly #fechaSalida;
  readonly #fechaSalidaSugerida;
  readonly #matricula;
  readonly #status;

  constructor(tipoVehiculo: number, idPlan: number, documentoUsuario: string, fechaIngreso: Date, matricula: string){
    this.validarTipoVehiculo(tipoVehiculo);
    this.validarTipoPlan(idPlan);
    this.validarDiasHabiles(fechaIngreso);
    this.#tipoVehiculo = tipoVehiculo;
    this.#idPlan = idPlan;
    this.#documentoUsuario = documentoUsuario;
    this.#fechaIngreso = fechaIngreso;
    this.#matricula = matricula;
    this.#status = STATUS[0];
  }

  private validarTipoVehiculo(tipoVehiculo: number) {
    if (TIPO_VEHICULO.filter(plan => plan.id === tipoVehiculo).length === 0) {
      throw new ErrorTipoVehiculo('Tipo de vehiculo Invalido');
    }
  }

  private validarTipoPlan(tipoPlan: number) {
    if (TIPO_PLAN.filter(plan => plan.id === tipoPlan).length === 0) {
      throw new ErrorTipoPlan('Tipo de plan Invalido');
    }
  }

  private validarDiasHabiles(fechaIngreso: Date){
    if (new Date(fechaIngreso).getDay() === 6 || new Date(fechaIngreso).getDay() === 0) {
      throw new ErrorDiaInvalido('Fecha Invalida, no se puede registrar pedidos los fines de semana');
    }

  }

  get tipoVehiculo() :number {
    return this.#tipoVehiculo;
  }

  get idPlan() :number {
    return this.#idPlan;
  }

  get documentoUsuario() :string {
    return this.#documentoUsuario;
  }

  get fechaIngreso() :Date {
    return this.#fechaIngreso;
  }

  get fechaSalida() :Date {
    return this.#fechaSalida;
  }

  get fechaSalidaSugerida(): Date {
    return this.#fechaSalidaSugerida;
  }

  get matricula(): string {
    return this.#matricula;
  }
  
}
