import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { Parking } from 'src/dominio/parking/modelo/parking';
import { ServicioRegistrarTicket } from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import { RepositorioParking } from 'src/dominio/parking/puerto/repository/repositorio-parking';
import { ParkingDto } from 'src/aplicacion/parking/consulta/dto/parking.dto';


describe('ServicioRegistrarTicket', () => {
  let servicioRegistrarTicket: ServicioRegistrarTicket;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioParking>;

  beforeEach(() => {
    repositorioUsuarioStub = createStubObj<RepositorioParking>(['calcularDemora','registrarTicket','valorDiasFestivos','registrarTicket'])
    servicioRegistrarTicket = new ServicioRegistrarTicket(repositorioUsuarioStub)
  })

  it('Deberia llamar al metodo registrar ticket', async () => {
    let result = 500
    let ticket = new Parking(1,1,"123456789",new Date("2021-09-07T15:11:04.972Z"),"ABC123")
    await servicioRegistrarTicket.ejecutar(ticket)
    const ticketDto: ParkingDto = {
      "tipoVehiculo": 1,
      "idPlan": 4,
      "documentoUsuario": "1234567890",
      "fechaIngreso": new Date("2021-09-07T15:11:04.972Z"),
      "fechaSalidaSugerida": new Date("2021-10-07T15:11:04.972Z"),
      "matricula":"ABC123",
      "id":1,
      "fechaSalida": new Date("2021-10-07T15:11:04.972Z")
    }
    
    expect(repositorioUsuarioStub.registrarTicket.getCalls().length).toBe(1)
    expect(repositorioUsuarioStub.registrarTicket.calledWith(ticket)).toBeTruthy();
  })
})