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
  };

  set tipoVehiculo(value: number) {
    this.#tipoVehiculo = value;
  };

  set idPlan(value: number) {
    this.#idPlan = value;
  };

  set fechaIngreso(value: Date) {
    this.#fechaIngreso = value;
  };

  set matricula(value: string) {
    this.#matricula = value;
  };

  set documentoUsuario(value: string) {
    this.#documentoUsuario = value;
  };


  set extraValorPagar(value: number) {
    this.#extraValorPagar = value;
  };

  set fechaSalidaSugerida(value: Date) {
    this.#fechaSalidaSugerida = value;
  };

  set fechaSalida(value: Date) {
    this.#fechaSalida = value;
  };

  set valorPagar(value: number) {
    this.#valorPagar = value;
  };

  set status(value: number) {
    this.#status = value;
  };

  get tipoVehiculo(): number {
    return this.#tipoVehiculo;
  };

  get idPlan(): number {
    return this.#idPlan;
  };

  get documentoUsuario() :string {
    return this.#documentoUsuario;
  };

  get fechaIngreso() :Date {
    return this.#fechaIngreso;
  };

  get fechaSalida() :Date {
    return this.#fechaSalida;
  };

  get fechaSalidaSugerida(): Date {
    return this.#fechaSalidaSugerida;
  };

  get matricula(): string {
    return this.#matricula;
  };

  get status(): number {
    return this.#status;
  };

  get valorPagar(): number {
    return this.#valorPagar;
  };

  get extraValorPagar(): number {
    return this.#extraValorPagar;
  };

  get id(): number {
    return this.#id;
  };

}
