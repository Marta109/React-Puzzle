import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login-page/login-page";
import WelcomePage from "./pages/welcome-page/welcome-page";
// import NotFound from "./components/not-found/not-found";
import AuthLayout from "./layouts/AuthLayout";
import MainLayout from "./layouts/MainLayout";
import MainPage from "./pages/main-page/main-page";
import { PuzzleProvider } from "./contexts/appContext";

import "./App.css";

function App() {
  return (
    <PuzzleProvider>
      <Routes>
        <Route
          path="/"
          element={
            <AuthLayout>
              <LoginPage />
            </AuthLayout>
          }
        />

        <Route
          path="/welcome"
          element={
            <MainLayout>
              <WelcomePage />
            </MainLayout>
          }
        />

        <Route
          path="/puzzle-game"
          element={<MainLayout>{<MainPage />}</MainLayout>}
        />

        <Route
          path="*"
          element={<AuthLayout>{/* <NotFound /> */}</AuthLayout>}
        />
      </Routes>
    </PuzzleProvider>
  );
}

export default App;
