import {DaoParking} from '../../../../dominio/parking/puerto/dao/dao-parking'
import {DaoParkingMysql} from '../../adaptador/dao/dao-parking-mysql'

export const daoParkingProvidier = {
  provide: DaoParking,
  useClass: DaoParkingMysql
}