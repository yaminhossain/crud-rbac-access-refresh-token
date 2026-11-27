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

const getBlogFromDB = async (id: string) => {
  const result = await pool.query(
    `
      SELECT b.id, b.title, b.sub_title, b.content, u.name AS author, t.name AS topic, b.created_at, b.updated_at
      FROM blogs AS b
      JOIN users AS u ON u.id = b.author_id
      JOIN topics AS t ON t.id = b.topic_id
      WHERE b.id = $1
    `,
    [id],
  );

  return result.rows[0];
};

const getAllBlogsFromDB = async () => {
  const result = await pool.query(`
    SELECT b.id, b.title, b.sub_title, b.content, u.name AS author, t.name AS topic, b.created_at, b.updated_at
    FROM blogs AS b
    JOIN users AS u
    ON b.author_id = u.id
    JOIN topics AS t
    ON b.topic_id = t.id
  `);
  return result.rows;
};

export const blogServices = {
  createBlogIntoDB,
  getBlogFromDB,
  getAllBlogsFromDB,
};
