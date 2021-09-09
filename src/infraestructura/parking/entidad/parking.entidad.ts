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
  private calcularFechaSalida(){
    let oldDate = new Date(this.fechaIngreso)
    if(TIEMPO_PLANES[0].id == this.idPlan) {
      this.fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours(), oldDate.getMinutes() + 30))
    }
    if(TIEMPO_PLANES[1].id == this.idPlan) {
      this.fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours() + 1, oldDate.getMinutes()))
    }
    if(TIEMPO_PLANES[2].id == this.idPlan) {
      this.fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours() + 8, oldDate.getMinutes()))
    }
    if(TIEMPO_PLANES[3].id == this.idPlan) {
      this.fechaSalidaSugerida = new Date(oldDate.setDate(oldDate.getDate() + 7))
    }
    if(TIEMPO_PLANES[4].id == this.idPlan) {
      this.fechaSalidaSugerida = new Date(oldDate.setMonth(oldDate.getMonth() + 1))
    }
  }
  

  @BeforeInsert()
  @BeforeUpdate()
  private setStatus() {
    this.fechaSalida ? this.status = 1 : this.status = 0;
  }

}
