import {MigrationInterface, QueryRunner} from 'typeorm';

export class CreateTableParking1630948432576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `parking` (`id` int NOT NULL AUTO_INCREMENT, `tipoVehiculo` int, `idPlan` int, `documentoUsuario` varchar(10) not null, `fechaIngreso` datetime NOT NULL, `fechaSalidaSugerida` datetime NOT NULL, `fechaSalida` datetime NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined)
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `parking`", undefined);
    }

}
