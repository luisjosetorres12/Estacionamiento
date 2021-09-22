import { TicketSearchDto } from 'src/aplicacion/parking/consulta/dto/ticket-search.dto';
import {ParkingDto} from '../../../../aplicacion/parking/consulta/dto/parking.dto';



export abstract class DaoParking {
    abstract listar(page: number): Promise<ParkingDto[]>;
    abstract buscar(id: number): Promise<TicketSearchDto>;
    abstract filtrar(queryParams: {}): Promise<ParkingDto[]>;
    abstract crearQuery(queryParams: {}): string;
}
