import { QueryInterface, DataTypes } from 'sequelize';
const TABLE_NAME = 'users';

export function up(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.createTable(TABLE_NAME, {
    user_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    first_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    user_role_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'user_roles',
        key: 'user_role_id',
      },
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
