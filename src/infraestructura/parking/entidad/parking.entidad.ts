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
    let posicionMinutos = 0
    let posicionHora = 1
    let posicionHoras = 2
    let posicionSemana = 3
    let posicionMes = 4
    let oldDate = new Date(this.fechaIngreso)
    if(TIEMPO_PLANES[posicionMinutos].id === this.idPlan) {
      let tiempo = 30
      this.fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours(), oldDate.getMinutes() + tiempo));
    }
    if(TIEMPO_PLANES[posicionHora].id === this.idPlan) {
      let tiempo = 1
      this.fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours() + tiempo, oldDate.getMinutes()));
    }
    if(TIEMPO_PLANES[posicionHoras].id === this.idPlan) {
      let tiempo = 8
      this.fechaSalidaSugerida = new Date(oldDate.setHours(oldDate.getHours() + tiempo, oldDate.getMinutes()));
    }
    if(TIEMPO_PLANES[posicionSemana].id === this.idPlan) {
      let tiempo = 7
      this.fechaSalidaSugerida = new Date(oldDate.setDate(oldDate.getDate() + tiempo));
    }
    if(TIEMPO_PLANES[posicionMes].id === this.idPlan) {
      let tiempo = 1
      this.fechaSalidaSugerida = new Date(oldDate.setMonth(oldDate.getMonth() + tiempo));
    }
  }
  

  @BeforeInsert()
  @BeforeUpdate()
  private setStatus() {
    this.fechaSalida ? this.status = 1 : this.status = 0;
  }

}
