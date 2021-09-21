
import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorTipoPlan extends ErrorDeNegocio {
	constructor(mensaje: string) {
	  super(mensaje,ErrorTipoPlan.name);
	}
}
