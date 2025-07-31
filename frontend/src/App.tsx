import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/chat";
import Login from "./pages/login";
import { AuthContextProvider } from "./contexts/AuthContext";
import { RequireAuth } from "./auth/RequireAuth";
import Post from "./pages/post";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/postar" element={<Post />} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
