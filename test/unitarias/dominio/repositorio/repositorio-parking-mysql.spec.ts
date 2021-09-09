import { SinonStubbedInstance } from 'sinon';
import { createStubObj } from '../../../util/create-object.stub';
import { Parking } from 'src/dominio/parking/modelo/parking';
import { ServicioRegistrarTicket } from 'src/dominio/parking/servicio/servicio-registrar-ticket';
import { RepositorioParking } from 'src/dominio/parking/puerto/repository/repositorio-parking';


describe('ServicioRegistrarTicket', () => {
  let servicioRegistrarTicket: ServicioRegistrarTicket;
  let repositorioUsuarioStub: SinonStubbedInstance<RepositorioParking>;

  beforeEach(() => {
    repositorioUsuarioStub = createStubObj<RepositorioParking>(['calcularDemora','registrarTicket','valorDiasFestivos'])
    servicioRegistrarTicket = new ServicioRegistrarTicket(repositorioUsuarioStub)
  })

  it('Deberia devolver el valor de la deuda', () => {
    let result = 500
    repositorioUsuarioStub.calcularDemora.withArgs(new Date("2021-09-07T15:13:04.972Z"), new Date("2021-09-07T15:11:04.972Z")).returns(result)
    expect(repositorioUsuarioStub.calcularDemora(new Date("2021-09-07T15:13:04.972Z"), new Date("2021-09-07T15:11:04.972Z"))).toBe(result)
  })
})