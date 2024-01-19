import { AutoIncrement, Column, CreatedAt, DB, Op, PrimaryKey, sequelize, Table, UpdatedAt } from '../config/sequelize';

@Table({
  tableName: 'user_roles',
  paranoid: true,
})
export default class User_Roles extends DB.Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public user_role_id!: number;

  @Column
  public role!: string;

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @Column
  public deletedAt: Date;

  public static async get_user_roles(): Promise<User_Roles[]> {
    return User_Roles.findAll({
      where: {
        role: {
          [Op.notIn]: ['Admin', 'root'],
        },
      },
    });
  }
}
sequelize.addModels([User_Roles]);
