import {ParkingDto} from '../../../../aplicacion/parking/consulta/dto/parking.dto';

export abstract class DaoParking {
    abstract listar(page: number): Promise<ParkingDto[]>;
    abstract buscar(id: number): Promise<ParkingDto>;
    abstract filtrar(queryParams: {}): Promise<ParkingDto[]>;
    abstract crearQuery(queryParams: {}): string;
} 