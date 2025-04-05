// // import { useState } from 'react'
// // import reactLogo from './assets/react.svg'
// // import viteLogo from '/vite.svg'
// import {
//   BrowserRouter as Router,
//   Routes,
//   Route,
//   Navigate,
// } from "react-router-dom";
// // import NotFound from "./components/not-found/not-found";
// // import { AppProvider } from "./contexts/appContext";
// import LoginPage from "./pages/login-page/login-page";
// import "./App.css";

// function App() {
//   // const [count, setCount] = useState(0)

//   return (
//     // <AppProvider>
//     // <Router>
//       <Routes>
//         <Route path="/login" element={<LoginPage />} />
//         <div className="App">

//         </div>
//         {/* <Route path="/welcome" element={<Welcome />} />
//           <Route path="/puzzle-game" element={<GameBoard />} /> */}
//         {/* <Route path="*" element={<NotFound />} />{" "} */}
//       </Routes>
//     // </Router>
//     // </AppProvider>
//   );
// }

// export default App;

import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/login-page/login-page";
import WelcomePage from "./pages/welcome-page/welcome-page";
// import GameBoard from "./pages/game-board/game-board";
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
          path="/login"
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
