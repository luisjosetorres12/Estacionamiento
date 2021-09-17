import {MigrationInterface, QueryRunner} from 'typeorm';

export class optionalParams1631046827289 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `parking` DROP COLUMN fechaSalidaSugerida');
        await queryRunner.query('ALTER TABLE `parking` ADD fechaSalidaSugerida datetime');
        await queryRunner.query('ALTER TABLE `parking` ADD matricula varchar(10) NOT NULL');
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `parking` DROP COLUMN fechaSalidaSugerida');
        await queryRunner.query('ALTER TABLE `parking` DROP COLUMN matricula');
    }

}
