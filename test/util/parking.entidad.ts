import { ParkingDto } from 'src/aplicacion/parking/consulta/dto/parking.dto';
import { ParkingEntidad } from 'src/infraestructura/parking/entidad/parking.entidad';

export function parkingEntidadPost() {
    let ticket = new ParkingEntidad()
    ticket.documentoUsuario = '123456789'
    ticket.tipoVehiculo = 1
    ticket.idPlan = 4
    ticket.fechaIngreso = new Date('2021-09-10T15:11:04.972Z')
    ticket.matricula = 'ABC123'
    ticket.valorPagar = 3000
    ticket.fechaSalidaSugerida = new Date('2021-10-10T15:11:04.972Z')
    return ticket
}


export function parkingEntidadResultPost() {
    let ticket = new ParkingEntidad()
    ticket.documentoUsuario = '123456789'
    ticket.tipoVehiculo = 1
    ticket.idPlan = 4
    ticket.fechaIngreso = new Date('2021-09-10T15:11:04.972Z')
    ticket.fechaSalidaSugerida = new Date('2021-10-10T15:11:04.972Z')
    ticket.matricula = 'ABC123'
    ticket.valorPagar = 9800
    ticket.extraValorPagar = 343.00000000000006
    ticket.id = 1
    ticket.status = 0
    return ticket
}

export function parkingEntidadResultPostObject() {
    let ticket = {
    documentoUsuario : '123456789',
    tipoVehiculo : 1,
    idPlan : 4,
    fechaIngreso : '2021-09-10T15:11:04.972Z',
    fechaSalidaSugerida : '2021-10-10T15:11:04.972Z',
    matricula : 'ABC123',
    valorPagar : 9800,
    extraValorPagar : 343.00000000000006,
    id : 1,
    status : 0
    }
    return ticket
}
