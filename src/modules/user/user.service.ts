import { pool } from "../../db/initDB";
import { IncomingUser, Roles } from "../../types/type";
import { findRole, getRoleID } from "../../utils/roleUtils";

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

const getUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT name, email, role_id, created_at FROM users
      WHERE id = $1
    `,
    [id],
  );

  const roleName = await findRole(result.rows[0].role_id);
  delete result.rows[0].role_id;
  const user = { ...result.rows[0], role: roleName };

  return user;
};

export const userServices = {
  createUserIntoDB,
  getUserFromDB,
};
