import { ApiProperty } from '@nestjs/swagger';

export class ParkingDto {
  @ApiProperty()
  id: number;
  
  @ApiProperty({ example: 1 })
  tipoVehiculo: number;

  @ApiProperty({ example: 2 })
  idPlan: number;

  @ApiProperty({ example: '1234567890' })
  documentoUsuario: string;

  @ApiProperty({ type: Date })
  fechaIngreso: Date;

  @ApiProperty({ type: Date })
  fechaSalidaSugerida: Date;

  @ApiProperty({ type: Date })
  fechaSalida: Date;

  @ApiProperty()
  matricula: string;
}