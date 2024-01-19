import { EntityNotFoundException } from '../src/utils/exceptions/EntityNotFound';
import { AutoIncrement, Column, CreatedAt, DB, Op, PrimaryKey, sequelize, Table, UpdatedAt } from '../config/sequelize';
import User_Roles from './User_Roles';

@Table({
  tableName: 'users',
  indexes: [{ fields: ['email', 'name'], unique: true, name: 'unique_index' }],
  paranoid: true,
})
export default class User extends DB.Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public user_id!: number;

  @Column
  public first_name!: string;

  @Column
  public last_name!: string;

  @Column
  public email!: string;

  @Column
  public password!: string;

  @Column({
    references: {
      model: User_Roles,
      key: 'user_role_id',
    },
  })
  public user_role_id!: number;

  get name(): string {
    let name = '';
    if (this.getDataValue('last_name')) {
      name = name + this.getDataValue('last_name');
    }
    if (this.getDataValue('first_name')) {
      name = name + ' ' + this.getDataValue('first_name');
    }
    return name;
  }

  @CreatedAt
  public createdAt: Date;

  @UpdatedAt
  public updatedAt: Date;

  @Column
  public deletedAt: Date;

  public User_Role: User_Roles;

  public static async findByEmail(email: string): Promise<User> {
    return User.findOne({ where: { email } });
  }

  public static async updateUserData(id: number, user: User): Promise<void> {
    if (user.id) {
      delete user.id;
    }
    await User.update(user, { where: { id } }).catch((error) => {
      console.log('Error', error);
      return error;
    });
  }

  public static async getUser(id: number): Promise<User> {
    const user = await User.findByPk(id);
    if (user) {
      return user;
    } else {
      throw new EntityNotFoundException('User Not Found');
    }
  }

  public static async isUserExists(email: string, user_name: string): Promise<User> {
    const query = [];
    if (user_name) {
      query.push({
        user_name,
      });
    }
    if (email) {
      query.push({
        email,
      });
    }
    return User.findOne({
      where: {
        [Op.or]: query,
      },
    });
  }
}
sequelize.addModels([User]);

User.hasOne(User_Roles, {
  sourceKey: 'user_role_id',
  foreignKey: 'user_role_id',
});

User_Roles.belongsTo(User, {
  foreignKey: 'user_role_id',
  targetKey: 'user_role_id',
});
