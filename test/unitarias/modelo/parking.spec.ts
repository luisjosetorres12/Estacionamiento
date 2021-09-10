import { Parking } from "src/dominio/parking/modelo/parking";

describe('Parking', () => {

    it('Deberia retornar la matricula', () => {
        const parking = new Parking(1,1,"123456789",new Date("2021-09-07T15:11:04.972Z"),"ABC123")
        expect(parking.matricula).toBe("ABC123")
    })

    it('Deberia retornar el tipo de vehiculo', () => {
        const parking = new Parking(1,1,"123456789",new Date("2021-09-07T15:11:04.972Z"),"ABC123")
        expect(parking.tipoVehiculo).toBe(1)
    })

    it('Deberia retornar el tipo de plan', () => {
        const parking = new Parking(1,1,"123456789",new Date("2021-09-07T15:11:04.972Z"),"ABC123")
        expect(parking.tipoVehiculo).toBe(1)
    })

    it('Deberia retornar el documento del cliente', () => {
        const parking = new Parking(1,1,"123456789",new Date("2021-09-07T15:11:04.972Z"),"ABC123")
        expect(parking.documentoUsuario).toBe("123456789")
    })

    it('Deberia retornar la fecha de ingreso', () => {
        const parking = new Parking(1,1,"123456789",new Date("2021-09-07T15:11:04.972Z"),"ABC123")
        expect(parking.fechaIngreso).toMatchObject(new Date("2021-09-07T15:11:04.972Z"))
    })
})