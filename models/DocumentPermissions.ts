import { AutoIncrement, Column, CreatedAt, DB, PrimaryKey, sequelize, Table, UpdatedAt } from '../config/sequelize';
import Document from './Documents';
import User from './User';

@Table({
  tableName: 'document_permissions',
  paranoid: true,
})
export default class DocumentPermission extends DB.Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public document_permission_id!: number;

  @Column({
    references: {
      model: Document,
      key: 'document_id',
    },
  })
  public document_id!: number;

  @Column({
    references: {
      model: User,
      key: 'user_id',
    },
  })
  public user_id!: number;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @Column
  public deletedAt: Date;
}
sequelize.addModels([DocumentPermission]);

DocumentPermission.hasMany(User, {
  sourceKey: 'user_id',
  foreignKey: 'user_id',
});
