import { pool } from "../../db/initDB";

const logInUserIntoDB = async (payload: {
  id: string;
  name: string;
  role_id: string;
}) => {
  const { id, name, role_id } = payload;
  const result = await pool.query(
    `
      SELECT * FROM users
      WHERE id = $1
    `,
    [id],
  );
 
  // return {accessToken, refreshToken}
  return result.rows[0];
};

export const authServices = {
  logInUserIntoDB,
};
