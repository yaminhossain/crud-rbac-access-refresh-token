import { pool } from "../db/initDB";
import { Roles } from "../types/type";

export const getRoleID = async (
  role: Roles.ADMIN | Roles.GUEST | Roles.USER,
): Promise<string> => {
  const result = await pool.query(`
      SELECT * FROM roles 
    `);

  return result.rows.find((singleRole) => singleRole.name === role).id;
};


export const findRole = async (roleID: string): Promise<Roles> => {
  const result = await pool.query(
    `
      SELECT * FROM roles
      WHERE id=$1
    `,
    [roleID],
  );
  if (result.rows[0]) {
    return result.rows[0]?.name;
  } else {
    throw new Error("Invalid Role Id");
  }
};