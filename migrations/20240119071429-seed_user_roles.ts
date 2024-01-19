import { QueryInterface, DataTypes } from 'sequelize';
const TABLE_NAME = 'user_roles';

const roles = [
  {
    role: 'Admin',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    role: 'Client',
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert(TABLE_NAME, roles);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  for (const role of roles) {
    await queryInterface.bulkDelete(TABLE_NAME, role);
  }
}
