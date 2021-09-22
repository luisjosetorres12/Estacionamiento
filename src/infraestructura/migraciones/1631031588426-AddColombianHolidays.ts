import {MigrationInterface, QueryRunner} from 'typeorm';
import * as holidays from 'colombia-holidays';

const CURRENT_YEAR = 2021;
const MAX_LENGTH = 19;
export class AddColombianHolidays1631031588426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE colombia_holidays (id int NOT NULL AUTO_INCREMENT, 
            diaCelebracion timestamp, celebracion varchar(80), PRIMARY KEY (id)) ENGINE=InnoDB`, undefined);

        let diasLibres = holidays.getColombiaHolidaysByYear(CURRENT_YEAR);
        for (let element of diasLibres) {
            await queryRunner.query(`insert into colombia_holidays(diaCelebracion,celebracion) 
            values('${new Date(element.holiday).toISOString().split('T').join(' ').substr(0,MAX_LENGTH)}', 
            '${element.celebration}')`, undefined);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('DROP TABLE `colombia_holidays`', undefined);
    }

}
