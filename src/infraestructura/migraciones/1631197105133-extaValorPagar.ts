import {MigrationInterface, QueryRunner} from 'typeorm';
//@ts-ignore
export class extaValorPagar1631197105133 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `parking` ADD extraValorPagar float');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('ALTER TABLE `parking` DROP COLUMN extraValorPagar');
    }

}
