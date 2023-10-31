import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import Category from './components/Category';
import {
    BrowserRouter as Router,
    Routes,
    Route,
} from "react-router-dom"

function App() {
    return (
        <Router basename="RanBookstoreReactState">
            <AppHeader/>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/categories/:id" element={<Category/>}/>
                <Route path="*" element={<div style={{fontSize: "large"}}>Page Not Found</div>}/>
            </Routes>

            <AppFooter/>
        </Router>
    );
}

export default App;

