export abstract class DaoPlanes {
  abstract valorAPagarPorPlan(tipoPlan: number, tipoVehiculo: number): Promise<number>;
}
