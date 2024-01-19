import {
  Sequelize,
  Table,
  AutoIncrement,
  Column,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  HasOne,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
} from 'sequelize-typescript';
import nativeSequelize, { Op } from 'sequelize';
import * as DB from 'sequelize-typescript';
import * as config from './config';

const sequelize = new Sequelize(config);

export {
  DB,
  sequelize,
  nativeSequelize,
  Op,
  Table,
  AutoIncrement,
  Column,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
  DeletedAt,
  HasMany,
  HasOne,
  BelongsTo,
  ForeignKey,
  BelongsToMany,
};
export default sequelize;
