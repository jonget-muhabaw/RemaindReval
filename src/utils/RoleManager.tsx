export const getUserRole = (): string | null => {
  return localStorage.getItem("role");
};

export const hasPermission = (requiredRole: string): boolean => {
  const userRole = getUserRole();
  return userRole === requiredRole;
};
