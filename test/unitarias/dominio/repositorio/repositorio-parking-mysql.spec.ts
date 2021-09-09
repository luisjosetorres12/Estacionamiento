import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { Parking } from 'src/dominio/parking/modelo/parking';
import { ServicioRegistrarTicket } from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import { RepositorioParking } from 'src/dominio/parking/puerto/repository/repositorio-parking';


describe('ServicioRegistrarTicket', () => {
  let servicioRegistrarTicket: ServicioRegistrarTicket;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioParking>;

  beforeEach(() => {
    repositorioUsuarioStub = createStubObj<RepositorioParking>(['calcularDemora','registrarTicket','valorDiasFestivos','registrarTicket'])
    servicioRegistrarTicket = new ServicioRegistrarTicket(repositorioUsuarioStub)
  })

  it('Deberia llamar al metodo registrar ticket', async () => {
    let result = 500
    await servicioRegistrarTicket.ejecutar(new Parking(1,1,"123456789",new Date("2021-09-07T15:11:04.972Z"),"ABC123"))
    
    expect(repositorioUsuarioStub.registrarTicket.getCalls().length).toBe(1)
  })
})