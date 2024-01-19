import bcrypt from "bcrypt";
import md5 from "md5";

const saltRounds = 10;

export const getHashOfPassword = (plainTextPassword: string): string => {
  return bcrypt.hashSync(plainTextPassword, saltRounds);
};

export const comparePassword = (plainTextPassword: string, hash: string): boolean => {
  return bcrypt.compareSync(plainTextPassword, hash) || md5(plainTextPassword) === hash;
};
