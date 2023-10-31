import '../assets/css/global.css';
import '../assets/css/Home.css'
import '../assets/css/Category.css'
import CategoryBookList from "./CategoryBookList";
import {useNavigate} from "react-router-dom";
import {fetchSuggestBookList} from "../api";
import {useContext, useEffect, useState} from "react";
import {CategoryItem} from "../types";
import {CategoryContext} from "../contexts/CategoryContext";


function Home() {
    const navigate = useNavigate();
    const [bookList, setBookList] = useState([]);
    const categoryList = useContext<CategoryItem[] | []>(CategoryContext);

    const handleNavigation = () => {
        navigate(`/categories/${1001}`);
    }

    useEffect(() => {
            const categoryName = categoryList?.filter((category: CategoryItem) =>
                category.categoryId == '1001')[0]?.name

            fetchSuggestBookList(categoryName)
                .then((data) => {
                    setBookList(data);
                })
                .catch((error) => {
                    console.error('Error fetching categories:', error);
                });
        }, [categoryList]
    );

    return (
        <div className="home-page">
            <h1>Today's pick</h1>
            <div className="category-page">
                <img
                    src={require('../assets/images/site/icons/Iconleft.png')}
                    alt="left-shitf"
                    width="40px"
                    height="40px"
                />

                <div className="book-section">
                    <div className="book-list-wrapper">
                        <div className="book-list">
                            <CategoryBookList bookList={bookList}/>
                        </div>
                    </div>
                </div>

                <img
                    src={require('../assets/images/site/icons/Iconright.png')}
                    alt="right-shift"
                    width="40px"
                    height="40px"
                />
            </div>

            <img
                className="CTA-button"
                src={require('../assets/images/site/callToAction.png')}
                alt="Shop Now Button"
                onClick={handleNavigation}
            />
        </div>
    )
}

export default Home;
