import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate } from 'typeorm';

const TIEMPO_PLANES = [{name: '30_Minutos', id: 0},
                   {name: '1_Hora', id: 1},
                   {name: '8_Horas', id: 2},
                   {name: 'Semana', id: 3},
                   {name: 'Mes', id: 4}
                  ]

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
