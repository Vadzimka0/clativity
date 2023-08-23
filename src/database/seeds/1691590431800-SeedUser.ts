import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedUser1691590431800 implements MigrationInterface {
  name = 'SeedUser1691590431800';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // password for admin is 'passwdadmin'
    await queryRunner.query(
      `INSERT INTO users (
        id,
        created_at,
        name,
        email,
        password,
        account_type
      ) 
      VALUES (
        'f60c913b-0859-4797-8dea-c07409ffcf0d',
        '2023-08-01',
        'admin_digitalcrewsolutions', 
        'admin@digitalcrewsolutions.com', 
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'admin'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '581cda30-fbe5-425e-b5ac-39b7ec05ad58',
        '2023-08-02',
        'matin_digitalcrewsolutions', 
        'matin@digitalcrewsolutions.com', 
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '591cda30-fbe5-425e-b5ac-39b7ec05ad59',
        '2023-08-03',
        'validuser59', 
        'validuser59@gmail.com', 
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '601cda30-fbe5-425e-b5ac-39b7ec05ad60',
        '2023-08-04',
        'validuser60', 
        'validuser60@gmail.com', 
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '611cda30-fbe5-425e-b5ac-39b7ec05ad61',
        '2023-08-05',
        'validuser61',
        'validuser61@gmail.com',
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '621cda30-fbe5-425e-b5ac-39b7ec05ad62',
        '2023-08-06',
        'testuser62',
        'testuser62@gmail.com',
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'test'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '631cda30-fbe5-425e-b5ac-39b7ec05ad63',
        '2023-08-07',
        'validuser63',
        'validuser63@gmail.com',
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '641cda30-fbe5-425e-b5ac-39b7ec05ad64',
        '2023-08-08',
        'validuser64',
        'validuser64@gmail.com',
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '651cda30-fbe5-425e-b5ac-39b7ec05ad65',
        '2023-08-09',
        'validuser65',
        'validuser65@gmail.com',
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '661cda30-fbe5-425e-b5ac-39b7ec05ad66',
        '2023-08-10',
        'validuser66',
        'validuser66@gmail.com',
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '671cda30-fbe5-425e-b5ac-39b7ec05ad67',
        '2023-08-11',
        'validuser67',
        'validuser67@gmail.com',
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '681cda30-fbe5-425e-b5ac-39b7ec05ad68',
        '2023-08-12',
        'validuser68',
        'validuser68@gmail.com',
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '691cda30-fbe5-425e-b5ac-39b7ec05ad69',
        '2023-08-13',
        'validuser69',
        'validuser69@gmail.com',
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
    await queryRunner.query(
      `INSERT INTO users (id, created_at, name, email, password, account_type) 
      VALUES (
        '701cda30-fbe5-425e-b5ac-39b7ec05ad70',
        '2023-08-14',
        'validuser70',
        'validuser70@gmail.com',
        '$2a$10$Xfbonhp01jxnQuefrAa79.HVkXlwBMoE91Bc.Ur07kpculzKatx3O',
        'valid'
      )`,
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}
}
