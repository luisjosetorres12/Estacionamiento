import {MigrationInterface, QueryRunner} from 'typeorm';

export class createValorPagarTabla1631201272430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('CREATE TABLE `planes` (`id` int NOT NULL AUTO_INCREMENT, `valorPagar` float, `nombrePlan` varchar(50), PRIMARY KEY (`id`)) ENGINE=InnoDB', undefined)

        const TIPO_PLAN = [{name: '30 Minutos Moto', value:3000},
                          {name: '30 Minutos Carro', value:5000},
                          {name: '1 Hora Moto', value: 5800},
                          {name: '1 Hora Carro', value: 9800},
                          {name: '8 Horas Moto', value:10000},
                          {name: '8 Horas Moto', value:15000},
                          {name: 'Semana Moto', value:40000},
                          {name: 'Semana Carro', value:50000},
                          {name: 'Mes Moto', value:120000},
                          {name: 'Mes Carro', value:180000}
                  ]
        for (let i = 0; i < TIPO_PLAN.length; i++) {
            const element = TIPO_PLAN[i];
            await queryRunner.query(`insert into planes(valorPagar, nombrePlan) values(${element.value}, '${element.name}')`)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('DROP TABLE planes')
    }

}
