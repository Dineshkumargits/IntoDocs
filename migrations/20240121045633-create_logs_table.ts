import { QueryInterface, DataTypes } from 'sequelize';
const TABLE_NAME = 'recent_activities';

export function up(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.createTable(TABLE_NAME, {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    activity_title: {
      type: DataTypes.STRING,
    },
    for_admin: {
      type: DataTypes.BOOLEAN,
    },
    for_client: {
      type: DataTypes.BOOLEAN,
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
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
