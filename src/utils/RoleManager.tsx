export const getUserRole = (): string | null => {
  return localStorage.getItem("role");
};

export const hasPermission = (requiredRoles: string[]): boolean => {
  const userRole = getUserRole();
  return requiredRoles.includes(userRole || "");
};
