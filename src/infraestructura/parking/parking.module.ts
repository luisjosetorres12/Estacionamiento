import { Module } from '@nestjs/common';
import { ParkingController } from './controlador/parking.controlador';
import {ParkingProveedorModule} from './proveedor/parking-proveedor.module'

@Module({
  imports: [
    ParkingProveedorModule
  ],
  controllers: [ParkingController],
})
export class ParkingModule {}
