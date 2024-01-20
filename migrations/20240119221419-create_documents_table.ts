import { QueryInterface, DataTypes } from 'sequelize';
const TABLE_NAME = 'documents';

export function up(queryInterface: QueryInterface): Promise<void> {
  return queryInterface.createTable(TABLE_NAME, {
    document_id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    s3_url: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    is_doc_box: {
      allowNull: true,
      type: DataTypes.BOOLEAN,
    },
    parent_document: {
      allowNull: true,
      type: DataTypes.STRING,
    },
    uploaded_by: {
      allowNull: false,
      type: DataTypes.INTEGER,
      references: {
        model: 'users',
        key: 'user_id',
      },
    },
    size: {
      type: DataTypes.INTEGER,
    },
    type: {
      type: DataTypes.STRING,
    },
    doc_box_id: {
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
