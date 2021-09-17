import {MigrationInterface, QueryRunner} from 'typeorm';

export class extaValorPagar1631197105133 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `parking` ADD extraValorPagar float');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `parking` DROP COLUMN extraValorPagar');
    }

}
