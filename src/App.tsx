import Interview from './pages/Interview';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

function App() {
    return (
        <Router>
            {/* <AppHeader/> */}
            <Routes>
                <Route path="/" element={<Interview />}/>
                <Route path="/interview" element={<Interview/>}/>
                <Route path="*" element={<div style={{fontSize: "large"}}>Page Not Found</div>}/>
            </Routes>

            {/* <AppFooter/> */}
        </Router>
    );
}

export default App;

