import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedBalance1691590431810 implements MigrationInterface {
  name = 'SeedBalance1691590431810';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO balances (
        id,
        value,
        user_id
      ) 
      VALUES (
        '96d3fb2f-969e-4cf3-be38-458cd729296d',
        '1000.00',
        'f60c913b-0859-4797-8dea-c07409ffcf0d'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('58d3fb2f-969e-4cf3-be38-458cd729296d','1000.00', '581cda30-fbe5-425e-b5ac-39b7ec05ad58')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('59d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '591cda30-fbe5-425e-b5ac-39b7ec05ad59')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('60d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '601cda30-fbe5-425e-b5ac-39b7ec05ad60')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('61d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '611cda30-fbe5-425e-b5ac-39b7ec05ad61')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('62d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '621cda30-fbe5-425e-b5ac-39b7ec05ad62')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('63d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '631cda30-fbe5-425e-b5ac-39b7ec05ad63')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('64d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '641cda30-fbe5-425e-b5ac-39b7ec05ad64')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('65d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '651cda30-fbe5-425e-b5ac-39b7ec05ad65')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('66d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '661cda30-fbe5-425e-b5ac-39b7ec05ad66')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('67d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '671cda30-fbe5-425e-b5ac-39b7ec05ad67')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('68d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '681cda30-fbe5-425e-b5ac-39b7ec05ad68')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('69d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '691cda30-fbe5-425e-b5ac-39b7ec05ad69')`,
    );
    await queryRunner.query(
      `INSERT INTO balances (id, value, user_id) 
      VALUES ('70d3fb2f-969e-4cf3-be38-458cd729296d','0.00', '701cda30-fbe5-425e-b5ac-39b7ec05ad70')`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
