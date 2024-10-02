export interface User {
  id?: number;
  userName?: string;
  password?: string;
  email?: string;
  name?: string;
  lastName?: string;
  gender?: string;
  phoneNumber?: string;
  userRoleId?: number;
  role?: string;
  isUserActive?: string;
  token?: string;
}

export interface AllUsersResponse {
  users?: User[];
  totalRecords?: number;
}
