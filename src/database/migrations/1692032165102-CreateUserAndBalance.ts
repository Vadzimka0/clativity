import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateUserAndBalance1692032165102 implements MigrationInterface {
  name = 'CreateUserAndBalance1692032165102';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "users_account_type_enum" AS ENUM ('test', 'admin', 'valid')`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "account_type" "public"."users_account_type_enum" NOT NULL DEFAULT 'test', CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "balances" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "value" numeric(7,2) NOT NULL DEFAULT '0', "user_id" uuid, CONSTRAINT "REL_864b90e3b151018347577be4f9" UNIQUE ("user_id"), CONSTRAINT "PK_74904758e813e401abc3d4261c2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "balances" ADD CONSTRAINT "FK_864b90e3b151018347577be4f97" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE "users_account_type_enum"`);
    await queryRunner.query(
      `ALTER TABLE "balances" DROP CONSTRAINT "FK_864b90e3b151018347577be4f97"`,
    );
    await queryRunner.query(`DROP TABLE "balances"`);
    await queryRunner.query(`DROP TABLE "users"`);
  }
}
