import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.addIndex('users', ['email'], {
    name: 'unique_index',
    unique: true,
    type: 'UNIQUE',
  });
  await queryInterface.addIndex('users_tokens', ['user_token'], {
    name: 'unique_index',
    unique: true,
    type: 'UNIQUE',
  });
}
export async function down(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.removeIndex('users', 'unique_index');
  await queryInterface.removeIndex('users_tokens', 'unique_index');
}
