import { IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ComandoRegistrarTicket {
  @IsNumber()
  @ApiProperty({ example: 1 })
  tipoVehiculo: number;

  @IsNumber()
  @ApiProperty({ example: 2 })
  idPlan: number;

  @IsString()
  @ApiProperty({ example: '123456789' })
  documentoUsuario: string;

  @IsString()
  @ApiProperty({ example: 'ABC1234' })
  matricula: string;

  @ApiProperty({ type: Date })
  fechaIngreso: Date;
}
