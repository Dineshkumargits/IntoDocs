import { QueryInterface } from 'sequelize';
const TABLE_NAME = 'users';

const users = [
  {
    first_name: 'Admin',
    last_name: '',
    email: 'admin@intodocs.com',
    password: '$2y$10$hu3bjm0xlt87OYbXvjg1xOfUf2IeKEvGRsjATAAfRSlUqvhWO6l/e',
    user_role_id: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];
export async function up(queryInterface: QueryInterface): Promise<void> {
  await queryInterface.bulkInsert(TABLE_NAME, users);
}

export async function down(queryInterface: QueryInterface): Promise<void> {
  for (const user of users) {
    await queryInterface.bulkDelete(TABLE_NAME, user);
  }
}
