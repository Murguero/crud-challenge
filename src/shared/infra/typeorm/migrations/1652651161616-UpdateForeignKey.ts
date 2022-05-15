import { MigrationInterface, QueryRunner, TableForeignKey } from 'typeorm';

export default class UpdateForeignKey1652651161616
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('address', 'UserAddress');

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        name: 'UserAddress',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('address', 'UserAddress');

    await queryRunner.createForeignKey(
      'address',
      new TableForeignKey({
        name: 'UserAddress',
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
