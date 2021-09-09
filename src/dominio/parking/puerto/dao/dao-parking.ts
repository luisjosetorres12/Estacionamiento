import {ParkingDto} from '../../../../aplicacion/parking/consulta/dto/parking.dto';

export abstract class DaoParking {
    abstract listar(): Promise<ParkingDto[]>
    abstract buscar(id: number): Promise<ParkingDto>
} 