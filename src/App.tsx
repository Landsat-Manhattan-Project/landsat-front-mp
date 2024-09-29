import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/home";
import AuthPage from "./pages/auth";

function App() {
  return (
    <Routes>
      <Route index element={<AuthPage />} />
      <Route path="home" element={<HomePage />} />
    </Routes>
  );
}

export default App;
