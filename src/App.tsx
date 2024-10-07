import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";
import { useAuthContext } from "./features/auth/general/model/auth.context";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { secret } from "./utils/secret";
import { getDataLocal } from "./utils/local_storage";
import Layout from "./features/ui/layout";
import EventsPage from "./pages/events";
import ChatPage from "./pages/chat";
import PlacePage from "./pages/places";
import PlaceDetailsPage from "./pages/place_details";

function App() {
  const { authState, setAuthState } = useAuthContext();
  const { decryptData } = secret();

  useEffect(() => {
    const auth = getDataLocal("auth");

    if (auth) {
      const result = decryptData(auth);
      if (result) {
        const finalResult = JSON.parse(JSON.parse(result));
        setAuthState(finalResult);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
          <Route path="home" element={Layout(HomePage)} />
          <Route path="scenes" element={Layout(EventsPage)} />
          <Route path="scenes/chat" element={Layout(ChatPage)} />
          <Route path="saved-places" element={Layout(PlacePage)} />
          <Route path="saved-places/:id" element={Layout(PlaceDetailsPage)} />
        </Route>
      </Routes>
      <ToastContainer />
    </>
  );
}

export default App;
