import { AuthProvider } from "../auth/general/model/auth.context";

const AppProviders = ({ children }: any) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProviders;
