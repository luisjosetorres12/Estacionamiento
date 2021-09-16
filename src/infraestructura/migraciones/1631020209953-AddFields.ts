import {MigrationInterface, QueryRunner} from 'typeorm';

export class AddFields1631020209953 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `parking` ADD valorPagar float;')
        await queryRunner.query('ALTER TABLE `parking` ADD status int;')
        await queryRunner.query('ALTER TABLE `parking` DROP COLUMN fechaSalida')
        await queryRunner.query('ALTER TABLE `parking` ADD fechaSalida datetime')
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query('ALTER TABLE `parking` DROP COLUMN valorPagar')
        await queryRunner.query('ALTER TABLE `parking` DROP COLUMN status')
        await queryRunner.query('ALTER TABLE `parking` MODIFY fechaSalida datetime NOT NULL')
    }

}
