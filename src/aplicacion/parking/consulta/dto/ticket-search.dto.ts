import { ApiProperty } from '@nestjs/swagger';

export class TicketSearchDto {
  @ApiProperty()
  id: number;
  
  @ApiProperty({ example: 1 })
  tipoVehiculo: number;

  @ApiProperty({ example: 2 })
  idPlan: number;

  @ApiProperty({ example: '123456789' })
  documentoUsuario: string;

  @ApiProperty({ type: Date })
  fechaIngreso: Date;

  @ApiProperty({ type: Date })
  fechaSalidaSugerida: Date;

  @ApiProperty({ type: Date })
  fechaSalida: Date;

  @ApiProperty()
  matricula: string;

  @ApiProperty()
  extraValorPagar: number;

  @ApiProperty()
  valorPagar: number;

}
