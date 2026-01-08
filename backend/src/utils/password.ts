import bcrypt from "bcryptjs";

export const hashPassword = (password: any) =>
  bcrypt.hash(password, 10);

export const comparePassword = (password: any, hash: any) =>
  bcrypt.compare(password, hash);
