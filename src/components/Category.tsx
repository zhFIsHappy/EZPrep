import '../assets/css/global.css';
import '../assets/css/Category.css'
import CategoryBookList from "./CategoryBookList";
import CategoryNav from "./CategoryNav";
import { useParams } from 'react-router-dom';
import {useContext, useEffect, useState} from "react";
import {fetchBookList} from "../api";
import {CategoryItem} from "../types";
import {CategoryContext} from "../contexts/CategoryContext";


function Category() {

    const { id } = useParams() as { id: string };
    const [bookList, setBookList] = useState([]);
    const categoryList = useContext<CategoryItem[] | []>(CategoryContext);

    useEffect(() => {
            const categoryName = categoryList?.filter((category: CategoryItem) =>
                category.categoryId == id)[0]?.name

            fetchBookList(categoryName)
                .then((data) => {
                    setBookList(data);
                })
                .catch((error) => {
                    console.error('Error fetching categories:', error);
                });
        }, [categoryList, id]
    );

    return (
        <div className="category-page">
            <img
                src={require('../assets/images/site/icons/Iconleft.png')}
                alt="left-shitf"
                width="40px"
                height="40px"
            />

            <div className="book-section">
                <CategoryNav />
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
    )
}

export default Category;