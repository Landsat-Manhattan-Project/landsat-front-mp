import { ThemeProvider } from "@emotion/react";
import { AuthProvider } from "../auth/general/model/auth.context";
import { theme } from "../ui/theme";

const AppProviders = ({ children }: any) => {
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </AuthProvider>
  );
};

export default AppProviders;
