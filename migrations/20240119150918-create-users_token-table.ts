import { QueryInterface, DataTypes } from 'sequelize';

export function up(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.createTable('users_tokens', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_token: {
      allowNull: false,
      type: DataTypes.STRING(512),
    },
    user_id: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: { model: 'users', key: 'user_id' },
    },
    device_ip: {
      type: DataTypes.STRING(255),
    },
    device_useragent: {
      type: DataTypes.STRING(255),
    },
    createdAt: {
      defaultValue: DataTypes.NOW,
      allowNull: true,
      type: DataTypes.DATE,
    },
    updatedAt: {
      defaultValue: DataTypes.NOW,
      allowNull: true,
      type: DataTypes.DATE,
    },
    deletedAt: {
      allowNull: true,
      type: DataTypes.DATE,
    },
    notification_token: {
      type: DataTypes.TEXT,
    },
  });
}

export function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable('users_tokens');
}
