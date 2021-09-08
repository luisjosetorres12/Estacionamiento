import {MigrationInterface, QueryRunner} from "typeorm";
import * as holidays from 'colombia-holidays'

export class AddColombianHolidays1631031588426 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("CREATE TABLE `colombia_holidays` (`id` int NOT NULL AUTO_INCREMENT, `diaCelebracion` timestamp, `celebracion` varchar(80), PRIMARY KEY (`id`)) ENGINE=InnoDB", undefined)

        let diasLibres = holidays.getColombiaHolidaysByYear(2021)
        for (let i = 0; i < diasLibres.length; i++) {
            const element = diasLibres[i];
            await queryRunner.query(`insert into colombia_holidays(diaCelebracion,celebracion) values('${new Date(element.holiday).toISOString().split('T').join(' ').substr(0,19)}', "${element.celebration}")`, undefined)
        }
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("DROP TABLE `colombia_holidays`", undefined);
    }

}
