import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTopUpTransaction1692032660814 implements MigrationInterface {
  name = 'CreateTopUpTransaction1692032660814';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "topup_transactions_status_enum" AS ENUM ('pending', 'confirmed', 'valid')`,
    );
    await queryRunner.query(
      `CREATE TABLE "topup_transactions" ("id" character varying NOT NULL, "session_id" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "neuron_qnt" integer NOT NULL, "status" "public"."topup_transactions_status_enum" NOT NULL DEFAULT 'pending', "user_id" uuid, CONSTRAINT "PK_f83232d9c4d7c5ecf4981dedcff" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "topup_transactions" ADD CONSTRAINT "FK_97bc493889d2ea5636072197da6" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TYPE "topup_transactions_status_enum"`);
    await queryRunner.query(
      `ALTER TABLE "topup_transactions" DROP CONSTRAINT "FK_97bc493889d2ea5636072197da6"`,
    );
    await queryRunner.query(`DROP TABLE "topup_transactions"`);
  }
}
