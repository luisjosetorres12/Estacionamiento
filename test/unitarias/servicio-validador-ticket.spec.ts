import { ErrorDiaInvalido } from "src/dominio/errores/error-dia-invalido";
import { ServicioValidadorTickets } from "src/dominio/parking/servicio/servicio-validador-ticket";

describe('ServicioValidadorTest', () => {
	
	let servicioValidador = new ServicioValidadorTickets()

	it('Deberia retornar error por fecha invalida', () => {
		try {
			servicioValidador.validarDiasHabiles(new Date("2021-09-19T13:20:55.883Z"))
		} catch (error) {
			expect(error.message).toBe("Fecha Invalida, no se puede registrar pedidos los fines de semana")
		}
	})

	it('Deberia retornar error por tipoVehiculo invalido', () => {
		try {
			servicioValidador.validarTipoVehiculo(3)
		} catch (error) {
			expect(error.message).toBe("Tipo de vehiculo Invalido")
		}
	})

	it('Deberia retornar error por tipoPlan invalido', () => {
		try {
			servicioValidador.validarTipoPlan(17)
		} catch (error) {
			expect(error.message).toBe("Tipo de plan Invalido")
		}
	})
})
