import {RepositorioParking} from 'src/dominio/parking/puerto/repository/repositorio-parking';
import {RepositorioParkingMysql} from './../../adaptador/repositorio/repositorio-parking-mysql';

export const repositoryParkingProvidier = {
    provide: RepositorioParking,
    useClass: RepositorioParkingMysql
}
