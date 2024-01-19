import { sequelize, DB, PrimaryKey, Column, AutoIncrement, Table, CreatedAt } from '../config/sequelize';
import User from './User';
import { generateDbToken, generateJWTToken } from '../src/helpers/session';

@Table({
  tableName: 'users_tokens',
  indexes: [{ fields: ['user_token'], unique: true, name: 'unique_index' }],
})
export default class Users_Tokens extends DB.Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Column
  public user_token!: string;
  @Column
  public user_id!: number;
  @Column
  public device_ip!: string;
  @Column
  public device_useragent!: string;

  @Column
  public notification_token!: string;

  @CreatedAt
  public createdAt: Date;

  @Column
  public deletedAt: Date;

  public static async getNewUserToken(user: User, req: any, expirationDays?: string) {
    const token = generateDbToken();

    const device_ip = req.ip || '';
    const device_useragent = req.headers['user-agent'] || '';
    const notification_token = '';

    const userToken: any = await Users_Tokens.create({
      user_token: token,
      user_id: user.user_id,
      device_ip,
      device_useragent,
      notification_token: notification_token,
    });
    if (!userToken) throw new Error('Error in token generation. Please contact admin.');
    return generateJWTToken(token, expirationDays);
  }

  public static async findByUser(user_id: number): Promise<Users_Tokens[]> {
    return await Users_Tokens.findAll({ where: { user_id: user_id } });
  }
}

sequelize.addModels([Users_Tokens]);
