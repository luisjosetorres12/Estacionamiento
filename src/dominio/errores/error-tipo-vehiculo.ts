
import { ErrorDeNegocio } from './error-de-negocio';

export class ErrorTipoVehiculo extends ErrorDeNegocio {
	constructor(mensaje: string) {
		super(mensaje,ErrorTipoVehiculo.name)
	}
}