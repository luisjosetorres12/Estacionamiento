import { Column, Entity, PrimaryGeneratedColumn, BeforeInsert } from 'typeorm';

const TIPO_PLAN = [{name: '30_Minutos', id: 0},
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

  @BeforeInsert()
  private calcularFechaSalida(){
    let oldDate = new Date(this.fechaIngreso)
    if(TIPO_PLAN[0].id == this.idPlan) {
      this.fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours(), oldDate.getMinutes() + 30))
    }
    if(TIPO_PLAN[1].id == this.idPlan) {
      this.fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours() + 1, oldDate.getMinutes()))
    }
    if(TIPO_PLAN[2].id == this.idPlan) {
      this.fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours() + 8, oldDate.getMinutes()))
    }
    if(TIPO_PLAN[3].id == this.idPlan) {
      this.fechaSalidaSugerida = new Date(oldDate.setDate(oldDate.getDate() + 7))
    }
    if(TIPO_PLAN[4].id == this.idPlan) {
      this.fechaSalidaSugerida = new Date(oldDate.setMonth(oldDate.getMonth() + 1))
    }
  }
}
