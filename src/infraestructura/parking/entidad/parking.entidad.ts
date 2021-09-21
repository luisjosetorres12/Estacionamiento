import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

@Entity({ name: 'parking' })
export class ParkingEntidad {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  documentoUsuario: string;

  @Column()
  tipoVehiculo: number;

  @Column()
  idPlan: number;

  @Column()
  fechaIngreso: Date;

  @Column()
  fechaSalidaSugerida: Date;

  @Column()
  fechaSalida: Date;

  @Column()
  matricula: string;

  @Column()
  status: number;

  @Column()
  valorPagar: number;

  @Column()
  extraValorPagar: number;  

  @BeforeInsert()
  @BeforeUpdate()
  private setStatus() {
    this.fechaSalida ? this.status = 1 : this.status = 0;
  }

}
