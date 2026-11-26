import { pool } from "../../db/initDB";
import { IncomingUser, Roles, User } from "../../types/type";
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
      RETURNING id, name, email, role_id, created_at
    `,
    [name, email, hashedPassword, createdAt, roleId],
  );
  return result.rows[0];
};

const getUserFromDB = async (id: string) => {
  const result = await pool.query(
    `
    SELECT u.id, u.name, u.email, u.created_at, r.name AS role
    FROM users AS u
    JOIN roles AS r 
    ON u.role_id = r.id
    WHERE u.id = $1
    `,
    [id],
  );
  return result.rows[0];
};

const getAllUserFromDB = async () => {
  const result = await pool.query(
    `
    SELECT u.id, u.name, u.email, u.created_at, r.name AS role
    FROM users AS u
    JOIN roles AS r 
    ON u.role_id = r.id
    `,
  );

  return result.rows;
};

const updateUserIntoDB = async (payload: Omit<User, "createAt" | "roleID">) => {
  const { id, name, email, password } = payload;

  const hashedPassword = await bcrypt.hash(password, 10);

  //  id, name, email, role_id, created_at
  const result = await pool.query(
    `
      UPDATE users
      SET name = COALESCE($1, name),
      email = COALESCE($2, email),
      password = COALESCE($3, password)
      WHERE id = $4
      RETURNING *
    `,
    [name, email, hashedPassword, id],
  );

  return result.rows[0]
};

export const userServices = {
  createUserIntoDB,
  getUserFromDB,
  getAllUserFromDB,
  updateUserIntoDB,
};
