import { AutoIncrement, Column, DB, PrimaryKey, sequelize, Table } from '../config/sequelize';

@Table({
  tableName: 'notification_templates',
})
export default class NotificationTemplate extends DB.Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  public id!: number;
  @Column
  public name!: string;
  @Column
  public emailSubject!: string;
  @Column
  public emailContent: string;
}
sequelize.addModels([NotificationTemplate]);
