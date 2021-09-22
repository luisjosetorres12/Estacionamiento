import { ComandoActualizarTicket } from "src/aplicacion/parking/comando/actualizar-ticket.comanto";
import { ParseService } from "src/aplicacion/parking/servicio/parser-service";
import { Ticket } from "src/dominio/parking/modelo/ticket";

describe('ParseServiceTest', () => {
  let parseService = new ParseService();

  it('Test Parse Service', () => {
    let ticket = new Ticket();
    ticket.fechaSalida = new Date("2021-09-06T13:20:55.883Z");
    ticket.fechaIngreso = new Date("2021-09-06T13:20:55.883Z");
    ticket.documentoUsuario = "123456789";
    ticket.tipoVehiculo = 1;
    ticket.matricula = "ABC123";
    ticket.idPlan = 0;

    let object = parseService.generateObjectToUpdate(ticket);
    expect(object).toMatchObject({
      "fechaSalida": new Date("2021-09-06T13:20:55.883Z"),
      "fechaIngreso": new Date("2021-09-06T13:20:55.883Z"),
      "documentoUsuario": "123456789",
      "tipoVehiculo": 1,
      "matricula": "ABC123",
      "idPlan": 0
    }) 
  })

  it('Test Parse Service 2', () => {
    let ticket = new ComandoActualizarTicket();
    ticket.tipoVehiculo = 1;
    ticket.documentoUsuario = "123456798";
    ticket.fechaSalida = new Date("2021-09-06T13:20:55.883Z");
    ticket.idPlan = 0;
    ticket.matricula = "ABC123";
    let result = parseService.parserComandoToTicket(ticket);

    expect(result.documentoUsuario).toBe(ticket.documentoUsuario);
    expect(result.tipoVehiculo).toBe(ticket.tipoVehiculo);
    expect(result.fechaSalida).toBe(ticket.fechaSalida);
    expect(result.idPlan).toBe(ticket.idPlan);
    expect(result.matricula).toBe(ticket.matricula);
  })
})