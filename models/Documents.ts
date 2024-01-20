import { AutoIncrement, Column, CreatedAt, DB, PrimaryKey, sequelize, Table, UpdatedAt } from '../config/sequelize';
import DocumentPermission from './DocumentPermissions';
import User from './User';

@Table({
  tableName: 'documents',
  paranoid: true,
})
export default class Document extends DB.Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public document_id!: number;

  @Column
  public name!: string;

  @Column
  public type!: string;

  @Column
  public size!: number;

  @Column
  public s3_url!: string;

  @Column
  public is_doc_box!: string;

  @Column
  public parent_document!: string;

  @Column({
    references: {
      model: User,
      key: 'user_id',
    },
  })
  public uploaded_by!: number;

  @Column
  public doc_box_id!: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @Column
  public deletedAt: Date;
}
sequelize.addModels([Document]);

Document.hasOne(User, {
  sourceKey: 'uploaded_by',
  foreignKey: 'user_id',
});
