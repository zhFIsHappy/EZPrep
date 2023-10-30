import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import Home from './components/Home'
import Category from './components/Category';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom"
import {useEffect, useState} from "react";
import {fetchCategories} from "./api";

function App() {
    const [categoryList, setCategoryList] = useState([]);

    useEffect(() => {
        fetchCategories()
            .then((data) => {
                setCategoryList(data);
            })
            .catch((error) => {
                console.error('Error fetching categories:', error);
            });
    }, []);


  return (
      <Router basename="RanBookstoreReactState">
        <AppHeader categoryList={categoryList} />
        <Routes>
          <Route path="/" element={<Home categoryList={categoryList} />} />
          <Route path="/categories/:id" element={<Category categoryList={categoryList} />} />
          <Route path="*" element={<div style={{fontSize: "large"}}>Page Not Found</div>} />
        </Routes>

        <AppFooter />

      </Router>
  );
}

export default App;

