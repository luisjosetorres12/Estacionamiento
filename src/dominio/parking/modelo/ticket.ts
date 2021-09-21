export class Ticket {
  
  #tipoVehiculo: number;
  #idPlan: number;
  #documentoUsuario: string;
  #fechaIngreso: Date;
  #matricula: string;
  #status: number;
  #valorPagar: number;
  #extraValorPagar: number;
  #fechaSalidaSugerida: Date;
  #fechaSalida: Date;
  #id: number;

  set id(value: number) {
    this.#id = value;
  }

  get id(): number {
    return this.#id;
  }

  set tipoVehiculo(value: number) {
    this.#tipoVehiculo = value;
  }

  get tipoVehiculo(): number {
    return this.#tipoVehiculo;
  }

  set idPlan(value: number) {
    this.#idPlan = value;
  }

  get idPlan(): number {
    return this.#idPlan;
  }

  set fechaIngreso(value: Date) {
    this.#fechaIngreso = value;
  }

  get fechaIngreso() :Date {
    return this.#fechaIngreso;
  }

  set matricula(value: string) {
    this.#matricula = value;
  }

  get matricula(): string {
    return this.#matricula;
  }

  set documentoUsuario(value: string) {
    this.#documentoUsuario = value;
  }

  get documentoUsuario() :string {
    return this.#documentoUsuario;
  }

  set extraValorPagar(value: number) {
    this.#extraValorPagar = value;
  }

  get extraValorPagar(): number {
    return this.#extraValorPagar;
  }

  set fechaSalidaSugerida(value: Date) {
    this.#fechaSalidaSugerida = value;
  }

  get fechaSalidaSugerida(): Date {
    return this.#fechaSalidaSugerida;
  }

  set fechaSalida(value: Date) {
    this.#fechaSalida = value;
  }

  get fechaSalida() :Date {
    return this.#fechaSalida;
  }

  set valorPagar(value: number) {
    this.#valorPagar = value;
  }

  get valorPagar(): number {
    return this.#valorPagar;
  }

  set status(value: number) {
    this.#status = value;
  }

  get status(): number {
    return this.#status;
  }
}
