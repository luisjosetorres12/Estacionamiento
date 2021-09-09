import { IsDateString, IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarTicket {
  @IsNumber()
  @ApiProperty({ example: 1 })
  tipoVehiculo: number;

  @IsNumber()
  @ApiProperty({ example: 2 })
  idPlan: number;

  @IsString()
  @ApiProperty({ example: '1234567890' })
  documentoUsuario: string;

  @IsString()
  @ApiProperty({ example: 'ABC123' })
  matricula: string;

  @ApiProperty({ type: Date })
  fechaIngreso: Date;

  @IsOptional()
  @ApiProperty({ type: Date })
  fechaSalida: Date;
}
