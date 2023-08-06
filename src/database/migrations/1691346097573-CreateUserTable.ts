import { MigrationInterface, QueryRunner } from "typeorm"

export class CreateUserTable1691346097573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "firstname" character varying(500) NOT NULL,
                "lastname" character varying(500) NOT NULL,
                "email" character varying(500) NOT NULL,
                "password_digest" text NOT NULL,
                "active" boolean NOT NULL DEFAULT true,
                "created_at" TIMESTAMP NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP NOT NULL DEFAULT now(),
                CONSTRAINT "UQ_97672ac88f789774dd47f7c8be4" UNIQUE ("email"),
                CONSTRAINT "PK_cace4a159ff9f2512dd42373761" PRIMARY KEY ("id")
            );`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `DROP TABLE "users";`,
        )
    }

}
