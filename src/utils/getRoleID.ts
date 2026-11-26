import { pool } from "../db/initDB";
import { Roles } from "../types/type";

const getRoleID = async (
  role: Roles.ADMIN | Roles.GUEST | Roles.USER,
): Promise<string> => {
  const result = await pool.query(`
      SELECT * FROM roles 
    `);

  return result.rows.find((singleRole) => singleRole.name === role).id;
};

export default getRoleID;
