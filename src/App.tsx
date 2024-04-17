import Interview from "./pages/Interview";
import AppHeader from "./pages/AppHeader";
import AppFooter from "./pages/AppFooter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { UserLogin } from "./pages/UserLogin";
import { ProblemSetPage } from "./pages/ProblemSetPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import initApp from "./initApp";

// Define the props type
interface AppProps {
  extra?: React.ReactNode; // `extra` can be any React node or undefined
}
//RegisterPage
// Modify the App component to accept its props
const App: React.FC<AppProps> = ({ extra }) => {

  useEffect(() => {
    initApp();
  }, [])
  // Your existing App component code...
  return (
    <Router>
      {/*<AppHeader />*/}
      <Routes>
        <Route path="/">
          <Route path="/" element={<HomePage />} />
          <Route path="/interview" element={<Interview />} />
          <Route path="/problem/:problemId" element={<Interview />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/submissions" element={<SubmissionsPage />}/>
          <Route
            path="/problemset"
            element={<ProblemSetPage />}
          ></Route>
          <Route
            path="*"
            element={<div style={{ fontSize: "large" }}>Page Not Found</div>}
          />
        </Route>
      </Routes>

      {/*<AppFooter />*/}
    </Router>
  );
};

export default App;
