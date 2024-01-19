import { QueryInterface, DataTypes } from 'sequelize';
const TABLE_NAME = 'user_roles';

export function up(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.createTable(TABLE_NAME, {
    user_role_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
  });
}

export function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable(TABLE_NAME);
}
