import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateWritingOffTransaction1692032829773
  implements MigrationInterface
{
  name = 'CreateWritingOffTransaction1692032829773';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "writingoff_transactions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "service_type" character varying NOT NULL, "service_qnt" integer NOT NULL, "neuron_qnt" integer NOT NULL, "user_id" uuid, CONSTRAINT "PK_25949628b8357731f923ce57154" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "writingoff_transactions" ADD CONSTRAINT "FK_3fa920468f5fa456790364f19bf" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "writingoff_transactions" DROP CONSTRAINT "FK_3fa920468f5fa456790364f19bf"`,
    );
    await queryRunner.query(`DROP TABLE "writingoff_transactions"`);
  }
}
