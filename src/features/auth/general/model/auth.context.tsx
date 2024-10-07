import {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { Auth } from "../../../../entities/auth";
import { useNavigate } from "react-router-dom";
import { landsatToast } from "../../../../utils/toast";
import { removeDataLocal } from "../../../../utils/local_storage";

interface IAuth {
  authState: Auth | undefined;
  setAuthState: Dispatch<SetStateAction<Auth | undefined>>;
  logout: () => void;
}

const AuthContext = createContext<IAuth>({
  authState: undefined,
  setAuthState: () => {},
  logout: () => {},
});

const AuthProvider: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const [authState, setAuthState] = useState<Auth | undefined>(undefined);
  const navigate = useNavigate();

  const logout = () => {
    setAuthState(undefined);
    removeDataLocal("auth");
    landsatToast("¡See you soon!", "success");
    navigate("/", { replace: true });
  };

  return (
    <AuthContext.Provider value={{ authState, setAuthState, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuthContext = (): IAuth => useContext(AuthContext);

export { AuthProvider, useAuthContext };
