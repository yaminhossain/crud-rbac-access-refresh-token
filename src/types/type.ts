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

export interface Blog {
  id?: string;
  title: string;
  subTitle?: string;
  content: string;
  topicId?: string;
  authorId: string;
  createAt?: string;
  updatedAt?: string;
}
