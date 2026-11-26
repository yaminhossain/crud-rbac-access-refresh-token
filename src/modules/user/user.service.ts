import { IncomingUser, Roles, User } from "../../types/type";
import getRoleID from "../../utils/getRoleID";

const createUserIntoDB = async (payload: IncomingUser) => {
  const { name, email, password, createdAt, role = Roles.GUEST } = payload;
  
  let roleId;
  if (role === Roles.ADMIN || role === Roles.GUEST || role === Roles.USER) {
    roleId = getRoleID(role);
  } else {
    throw new Error("Invalid role");
  }

  return roleId;
};

export const userServices = {
  createUserIntoDB,
};
