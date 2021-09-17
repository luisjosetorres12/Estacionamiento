import {MigrationInterface, QueryRunner} from 'typeorm';

export class createValorPagarTabla1631201272430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `planes` (`id` int NOT NULL AUTO_INCREMENT, `valorPagar` float, `nombrePlan` varchar(50), `idPlan` int, `tipoVehiculo` int, PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined);

        const TIPO_PLAN = [{name: '30 Minutos Moto',idPlan: 0, tipoVehiculo: 0, value:3000},
                          {name: '30 Minutos Carro',idPlan: 0, tipoVehiculo: 1, value:5000},
                          {name: '1 Hora Moto', idPlan: 1, tipoVehiculo: 0,value: 5800},
                          {name: '1 Hora Carro', idPlan: 1, tipoVehiculo: 1,value: 9800},
                          {name: '8 Horas Moto', idPlan: 2, tipoVehiculo: 0, value:10000},
                          {name: '8 Horas Moto', idPlan: 2, tipoVehiculo: 1, value:15000},
                          {name: 'Semana Moto', idPlan: 3, tipoVehiculo: 0, value:40000},
                          {name: 'Semana Carro',idPlan: 3, tipoVehiculo: 1, value:50000},
                          {name: 'Mes Moto', idPlan: 4, tipoVehiculo: 0,value:120000},
                          {name: 'Mes Carro', idPlan: 4, tipoVehiculo: 1,value:180000}
                  ];
        for (let i = 0; i < TIPO_PLAN.length; i++) {
            const element = TIPO_PLAN[i];
            await queryRunner.query(`insert into planes(valorPagar, nombrePlan, idPlan, tipoVehiculo) values(${element.value}, '${element.name}', ${element.idPlan}, ${element.tipoVehiculo})`);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE planes');
    }

}
