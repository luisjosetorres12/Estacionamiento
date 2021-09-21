import { DaoPlanes } from '../../../../dominio/parking/puerto/dao/dao-planes';
import { DaoPlanesMysql } from '../../adaptador/dao/dao-planes-mysql';

export const daoPlanesProvidier = {
  provide: DaoPlanes,
  useClass: DaoPlanesMysql
};
