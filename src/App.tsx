import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import MyContent from "./pages/MyContent";
import Admin from "./pages/Admin";
import NavBar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFound from "./pages/NotFound";
import AccessDenied from "./pages/AccessDenied";

function App() {
  return (
    <>
      <Router>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route element={<ProtectedRoute requiredRole="USER" />}>
            <Route path="/my-content" element={<MyContent />} />
          </Route>
          <Route element={<ProtectedRoute requiredRole="ADMIN" />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="*" element={<NotFound />} />
          <Route path="/access-denied" element={<AccessDenied />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
