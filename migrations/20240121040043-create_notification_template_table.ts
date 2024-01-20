import { QueryInterface, DataTypes } from 'sequelize';

export function up(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.createTable('notification_templates', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(255),
    },
    emailSubject: {
      type: DataTypes.TEXT,
    },
    emailContent: {
      type: DataTypes.TEXT,
    },
    pushSubject: {
      type: DataTypes.TEXT,
    },
    pushContent: {
      type: DataTypes.TEXT,
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  });
}

export function down(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.dropTable('notification_templates');
}
