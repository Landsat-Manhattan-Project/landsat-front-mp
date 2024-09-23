import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route index element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
