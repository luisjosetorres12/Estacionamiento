import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking'
import { createStubObj } from '../../../util/create-object.stub';
import { SinonStubbedInstance } from 'sinon';
import {ServicioRegistrarTicket} from 'src/dominio/parking/servicio/servicio-registrar-ticket'
import { Parking } from 'src/dominio/parking/modelo/parking';

describe('RepositorioParkingMysql', () => {
  let repositorioParking: SinonStubbedInstance<RepositorioParking>
  let servicioRegistrarTicket: ServicioRegistrarTicket

  beforeEach(() => {
    repositorioParking = createStubObj<RepositorioParking>(['actualizarTicket',
    'registrarTicket',
    'registrosPorTipoPlan',
    'registrosPorTipoVehiculo', 
    'registrosPorUsuario',
    'valorDiasFestivos'])

    servicioRegistrarTicket = new ServicioRegistrarTicket(repositorioParking)
  })

  // it('Deberia traer los registros por tipo de plan', async () => {
  //   await servicioRegistrarTicket.ejecutar(new Parking(1,1,'1234567890',new Date('2021-11-15T15:15:04.972Z'), 'ABC123'))
  //   await servicioRegistrarTicket.ejecutar(new Parking(1,2,'1234567890',new Date('2021-11-15T15:15:04.972Z'), 'ABC123'))
  //   await servicioRegistrarTicket.ejecutar(new Parking(1,2,'1234567890',new Date('2021-11-15T15:15:04.972Z'), 'ABC124'))

  //   expect((await repositorioParking.registrosPorTipoPlan(2)).length).toBe(2)
  //   expect((await repositorioParking.registrosPorTipoPlan(1)).length).toBe(1)
  // })
})