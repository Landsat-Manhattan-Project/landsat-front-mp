export interface Auth {
  email?: string;
  password?: string;
  token?: string;
  userRole: "user" | "guest";
}
