import { pool } from "../../db/initDB";
import { IncomingBlog } from "../../types/type";

const createBlogIntoDB = async (payload: IncomingBlog) => {
  const { title, sub_title, content, topic_id, author_id } = payload;

  const result = await pool.query(
    `
      INSERT INTO blogs(title, sub_title, content, topic_id, author_id)
      VALUES($1, COALESCE($2,''), $3, $4, $5)
      RETURNING *
    `,
    [title, sub_title, content, topic_id, author_id],
  );

  return result.rows[0];
};

export const blogServices = { createBlogIntoDB };
