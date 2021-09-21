import { Ticket } from "src/dominio/parking/modelo/ticket";

describe('Test Ticket', () => {
  let ticket = new Ticket()
  beforeAll(() => {
    ticket.matricula = "ABC123"
    ticket.tipoVehiculo = 1
    ticket.idPlan = 0
    ticket.status = 0
    ticket.valorPagar = 8200
    ticket.extraValorPagar = 6200;
    ticket.fechaSalida = new Date("2021-09-06T13:20:55.883Z")
    ticket.fechaIngreso = new Date("2021-09-06T13:20:55.883Z")
    ticket.fechaSalidaSugerida = new Date("2021-09-06T13:20:55.883Z")
    ticket.documentoUsuario = "123456987";
    ticket.id = 1
  })

  it('Deberia retornar la matricula', () => {
    expect(ticket.matricula).toBe("ABC123")
  })

  it('Deberia retornar el tipo de vehiculo', () => {
    expect(ticket.tipoVehiculo).toBe(1)
  })

  it('Deberia retornar el tipo de plan', () => {
    expect(ticket.idPlan).toBe(0)
  })

  it('Deberia retornar el status', () => {
    expect(ticket.idPlan).toBe(0)
  })

  it('Deberia retornar el valor a pagar', () => {
    expect(ticket.valorPagar).toBe(8200)
  })

  it('Deberia retornar el extra valor a pagar', () => {
    expect(ticket.extraValorPagar).toBe(6200)
  })

  it('Deberia retornar La fecha de salida', () => {
    expect(ticket.fechaSalida).toMatchObject(new Date("2021-09-06T13:20:55.883Z"))
  })

  it('Deberia retornar La fecha de ingreso', () => {
    expect(ticket.fechaIngreso).toMatchObject(new Date("2021-09-06T13:20:55.883Z"))
  })

  it('Deberia retornar La fecha de salida sugerida', () => {
    expect(ticket.fechaSalidaSugerida).toMatchObject(new Date("2021-09-06T13:20:55.883Z"))
  })

  it('Deberia retornar el documento del usuario', () => {
    expect(ticket.documentoUsuario).toBe("123456987")
  })

  it('Deberia retornar el id', () => {
    expect(ticket.id).toBe(1)
  })
})