import * as planes from 'src/dominio/parking/modelo/planes';

describe('Test to Planes', () => {
  
  it('Plan media hora test', () => {
    expect(planes.PLAN_MEDIA_HORA).toBe(0)
    expect(planes.TREINTA_MINUTOS).toBe(30)
  })

  it('Plan una hora test', () => {
    expect(planes.PLAN_UNA_HORA).toBe(1)
    expect(planes.UNA_HORA).toBe(1)
  })

  it('Plan ocho horas', () => {
    expect(planes.PLAN_OCHO_HORAS).toBe(2)
    expect(planes.OCHO_HORAS).toBe(8)
  })

  it('Plan una semana', () => {
    expect(planes.PLAN_UNA_SEMANA).toBe(3)
    expect(planes.UNA_SEMANA).toBe(7)
  })

  it('Plan un mes', () => {
    expect(planes.PLAN_UN_MES).toBe(4)
    expect(planes.UN_MES).toBe(1)
  })
})
