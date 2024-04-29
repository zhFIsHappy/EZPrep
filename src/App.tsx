import InterviewPage from "./pages/InterviewPage";
import AppHeader from "./pages/AppHeader";
import AppFooter from "./pages/AppFooter";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import { UserLogin } from "./pages/UserLogin";
import { ProblemSetPage } from "./pages/ProblemSetPage";
import SubmissionsPage from "./pages/SubmissionsPage";
import UserProfile from "./pages/UserProfile";
import initApp from "./initApp";
import UserProfileEdit from "./pages/UserProfileEdit";
import SubmissionDetailPage from "./pages/SubmissionDetailPage";

// Define the props type
interface AppProps {
  extra?: React.ReactNode; // `extra` can be any React node or undefined
}
//RegisterPage
// Modify the App component to accept its props
const App: React.FC<AppProps> = ({ extra }) => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    initApp();
    setIsReady(true);
  }, []);

  if (!isReady) {
    return (
      <div />
    )
  }

  // Your existing App component code...
  return (
    <Router>
      {/*<AppHeader />*/}
      <Routes>
        <Route path="/">
          <Route path="/" element={<HomePage />} />
          <Route path="/interview" element={<InterviewPage />} />
          <Route path="/problem/:problemId" element={<InterviewPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" Component={RegisterPage} />
          <Route path="/profile" Component={UserProfile} />
          <Route path="/edit-profile" element={<UserProfileEdit />} />
          <Route path="/submissions" element={<SubmissionsPage />} />
          <Route path="/submission/:submissionId" element={<SubmissionDetailPage />} />
          <Route path="/problemset" element={<ProblemSetPage />}></Route>
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
