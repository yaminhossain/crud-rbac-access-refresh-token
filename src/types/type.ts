export enum Roles {
  ADMIN = "admin",
  USER = "user",
  GUEST = "guest",
}

export enum Topics {
  FRONTEND = "Frontend",
  BACKEND = "Backend",
  DATABASE = "Database",
  SECURITY = "Security",
  DEVOPS = "DevOps",
}

export interface User {
  id?: string;
  name: string;
  email: string;
  password: string;
  roleID: string;
  createdAt?: string;
}

export type IncomingUser = Omit<User, "id" | "roleID"> & {
  role?: Roles.ADMIN | Roles.GUEST | Roles.USER;
};

export interface Blog {
  id?: string;
  title: string;
  sub_title?: string;
  content: string;
  topic_id?: string;
  author_id: string;
  create_at?: string;
  updated_at?: string;
}

export type IncomingBlog = Omit<Blog, "id" | "createdAt" | "updatedAt">;
