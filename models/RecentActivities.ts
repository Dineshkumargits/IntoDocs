import { AutoIncrement, Column, CreatedAt, DB, PrimaryKey, sequelize, Table, UpdatedAt } from '../config/sequelize';
import User from './User';

@Table({
  tableName: 'recent_activities',
  paranoid: true,
})
export default class RecentActivities extends DB.Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;

  @Column
  public activity_title!: string;

  @Column
  public for_admin!: boolean;

  @Column
  public for_client!: boolean;

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
sequelize.addModels([RecentActivities]);
