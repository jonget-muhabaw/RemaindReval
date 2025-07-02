

export interface Users {
  success: boolean;
  count: number;
  data: Datum[];
}

export interface Datum {
  id: string;
  name: string;
  username: string; 
  password: string;
  roleId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: null;
  role: Role;
}

export interface Role {
  id: string;
  name: string;
}
