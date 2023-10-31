import '../assets/css/CategoryNav.css'
import '../assets/css/global.css'
import { CategoryItem, categoryProps} from "../types";
import {useNavigate, useParams} from "react-router-dom";
import {useContext} from "react";
import {CategoryContext} from "../contexts/CategoryContext";


function CategoryNav() {
  const { id } = useParams();
  const navigate = useNavigate();
  const categoryList = useContext<CategoryItem[] | []>(CategoryContext);
  const handleNavigation = (cId: string) => {
    navigate(`/categories/${cId}`);
  }
  return (
  <nav className="category-list">
      {categoryList.map((category: CategoryItem) => (
            <div
                key={category.categoryId}
                className={`category ${category.categoryId == id && "active"}`}
                onClick={() => handleNavigation(category.categoryId)}
            >
              {category.name}
            </div>
          ))}
  </nav>
)
}

export default CategoryNav;

