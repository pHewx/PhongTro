import bcrypt from "bcryptjs";

export const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));

export const comparePassword = (password, respondPassword) =>
  bcrypt.compareSync(password, respondPassword);
