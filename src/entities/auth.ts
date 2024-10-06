export interface Auth {
  email?: string;
  password?: string;
  token?: string;
  role: "user" | "guest";
  purpose?: string;
}
