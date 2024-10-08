import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import { useAuthContext } from "./features/auth/general/model/auth.context";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { secret } from "./utils/secret";
import { getDataLocal } from "./utils/local_storage";

function App() {
  const { authState, setAuthState } = useAuthContext();
  const { decryptData } = secret();

  useEffect(() => {
    const auth = getDataLocal("auth");

    if (auth) {
      const result = decryptData(auth);
      if (result) setAuthState(JSON.parse(result));
    }
  }, [decryptData, setAuthState]);

  const ProtectedRoutes = () => {
    if (!authState) {
      return <Navigate to="/" />;
    }
    return <Outlet />;
  };

  const UnprotectedRoutes = () => {
    if (authState) {
      return <Navigate to="/home" />;
    }
    return <Outlet />;
  };

  return (
    <>
      <Routes>
        <Route element={<UnprotectedRoutes />}>
          <Route index element={<AuthPage />} />
        </Route>
        <Route element={<ProtectedRoutes />}>
          <Route path="home" element={<HomePage />} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
