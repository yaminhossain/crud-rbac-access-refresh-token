import { pool } from "../../db/initDB";
import { IncomingUser, Roles, User } from "../../types/type";
import getRoleID from "../../utils/getRoleID";
import bcrypt from "bcryptjs";

const createUserIntoDB = async (payload: IncomingUser) => {
  const { name, email, password, createdAt, role = Roles.GUEST } = payload;

  let roleId;
  if (role === Roles.ADMIN || role === Roles.GUEST || role === Roles.USER) {
    roleId = await getRoleID(role);
  } else {
    throw new Error("Invalid role");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const result = await pool.query(
    `
      INSERT INTO users (name, email, password, created_at, role_id)
      VALUES($1, $2, $3, COALESCE($4, NOW()), $5 )
      RETURNING *
    `,
    [name, email, hashedPassword, createdAt, roleId],
  );
  

  return result.rows[0];
};

export const userServices = {
  createUserIntoDB,
};
