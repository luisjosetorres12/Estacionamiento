import { ServicioFechaTickets } from "src/dominio/parking/servicio/servicio-fechas-ticket";

describe('ServicioFechas Test', () => {
  let serviceFechas = new ServicioFechaTickets();

  it('Deberia calcular la demora', () => {
    let demora = serviceFechas.calcularDemora(new Date("2021-09-06T13:20:55.883Z"),new Date("2021-09-06T13:18:55.883Z"))
    expect(demora).toBe(500);

    demora = serviceFechas.calcularDemora(new Date("2021-09-06T13:20:55.883Z"),new Date("2021-09-06T13:20:55.883Z"))
    expect(demora).toBe(0);

    demora = serviceFechas.calcularDemora(new Date("2021-09-06T13:20:55.883Z"),new Date("2021-09-06T13:21:55.883Z"))
    expect(demora).toBe(0);
  })

  it('Deberia calcularFechaSalida con Plan 4', () => {
    let fecha = serviceFechas.calcularFechaSalida(new Date('2021-10-10T15:11:04.972Z'),4)
    expect(fecha).toMatchObject(new Date('2021-11-10T15:11:04.972Z'))
  })

  it('Deberia calcularFechaSalida con Plan 3', () => {
    let fecha = serviceFechas.calcularFechaSalida(new Date('2021-10-10T15:11:04.972Z'),3)
    expect(fecha).toMatchObject(new Date('2021-10-17T15:11:04.972Z'))
  })

  it('Deberia calcularFechaSalida con Plan 2', () => {
    let fecha = serviceFechas.calcularFechaSalida(new Date('2021-10-10T15:11:04.972Z'),2)
    expect(fecha).toMatchObject(new Date('2021-10-10T23:11:04.972Z'))
  })

  it('Deberia calcularFechaSalida con Plan 1', () => {
    let fecha = serviceFechas.calcularFechaSalida(new Date('2021-10-10T15:11:04.972Z'),1)
    expect(fecha).toMatchObject(new Date('2021-10-10T16:11:04.972Z'))
  })

  it('Deberia calcularFechaSalida con Plan 0', () => {
    let fecha = serviceFechas.calcularFechaSalida(new Date('2021-10-10T15:11:04.972Z'),0)
    expect(fecha).toMatchObject(new Date('2021-10-10T15:41:04.972Z'))
  })
})