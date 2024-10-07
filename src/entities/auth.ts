export interface Auth {
  email?: string;
  password?: string;
  token?: string;
  userRolApp?: "user" | "guest";
  role?: string;
  purpose?: string;
}
