import {DaoDiasFestivos} from '../../../../dominio/parking/puerto/dao/dao-dias-festivos';
import {DaoDiasFestivosMysql} from '../../adaptador/dao/dao-dias-festivos-mysql';

export const daoDiasFestivosProvidier = {
  provide: DaoDiasFestivos,
  useClass: DaoDiasFestivosMysql
};
