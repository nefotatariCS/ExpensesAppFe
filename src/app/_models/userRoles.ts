export interface UserRole {
  id?: number;
  userRoleName?: string;
  isUserRoleActive?: string;
  userRoleDescription?: string;
}

export interface AllUserRoleRepsonse {
  userRoles?: UserRole[];
  totalRecords?: number;
}
