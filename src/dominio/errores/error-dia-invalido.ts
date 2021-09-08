import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorDiaInvalido extends ErrorDeNegocio {
  constructor(mensaje: string) {
    super(mensaje, ErrorDiaInvalido.name);
  }
}
