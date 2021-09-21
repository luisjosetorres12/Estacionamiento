import { IsNumber, IsString, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoActualizarTicket {
  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 1 })
  tipoVehiculo: number;

  @IsOptional()
  @IsNumber()
  @ApiProperty({ example: 2 })
  idPlan: number;

  @IsOptional()
  @IsString()
  @ApiProperty({ example: '1234567890' })
  documentoUsuario: string;

  @ApiProperty({ example: 'ABC123' })
  @IsOptional()
  matricula: string;

  @IsOptional()
  @ApiProperty({ type: Date })
  fechaSalida: Date;
}
