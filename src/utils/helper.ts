export const validStingID = (
  id: string | string[] | undefined,
): id is string => {
  if (typeof id !== "string") {
    return false;
  }
  return true;
};
