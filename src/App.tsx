import Interview from "./pages/Interview";
import AppHeader from "./pages/AppHeader";
import AppFooter from "./pages/AppFooter";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Define the props type
interface AppProps {
  extra?: React.ReactNode; // `extra` can be any React node or undefined
}

// Modify the App component to accept its props
const App: React.FC<AppProps> = ({ extra }) => {
  // Your existing App component code...
  return (
    <Router>
      {/*<AppHeader />*/}
      <Routes>
        <Route path="/" element={<Interview />} />
        <Route path="/interview" element={<Interview />} />
        <Route
          path="*"
          element={<div style={{ fontSize: "large" }}>Page Not Found</div>}
        />
      </Routes>

      {/*<AppFooter />*/}
    </Router>
  );
};

export default App;
