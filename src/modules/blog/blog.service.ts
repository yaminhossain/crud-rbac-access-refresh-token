import { pool } from "../../db/initDB";
import { Blog, IncomingBlog } from "../../types/type";

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
      SELECT
        b.id,
        b.title,
        b.sub_title,
        b.content,
        u.name AS author,
        t.name AS topic,
        b.created_at,
        b.updated_at
      FROM blogs AS b
      JOIN users AS u ON u.id = b.author_id
      LEFT JOIN topics AS t ON t.id = b.topic_id
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

const updateBlogIntoDB = async (
  payload: Pick<Blog, "id" | "title" | "sub_title" | "content" | "topic_id">,
) => {
  const { id, title, sub_title, content, topic_id } = payload;
  const result = await pool.query(
    `
      UPDATE blogs
      SET title = COALESCE($1,title),
      sub_title = COALESCE($2,sub_title),
      content = COALESCE($3,content),
      topic_id = COALESCE($4,topic_id),
      updated_at = NOW()
      WHERE id = $5
      RETURNING *
    `,
    [title, sub_title, content, topic_id, id],
  );

  return result.rows[0];
};

const deleteBlogFromDB = async (id: string) => {
  const result = await pool.query(
    `
    DELETE FROM blogs
    WHERE id = $1
    RETURNING *
    `,
    [id],
  );

  return result.rows[0];
};
export const blogServices = {
  createBlogIntoDB,
  getBlogFromDB,
  getAllBlogsFromDB,
  updateBlogIntoDB,
  deleteBlogFromDB,
};
