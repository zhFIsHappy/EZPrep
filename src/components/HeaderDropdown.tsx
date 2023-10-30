import '../assets/css/global.css'
import '../assets/css/HeaderDropdown.css';
import { Link } from 'react-router-dom';
import { CategoryItem, categoryProps} from "../types";


function HeaderDropdown({categoryList} : categoryProps) {
    return (
        <nav className="header-dropdown">
            Categories
            <ul>
                {categoryList.map((item: CategoryItem) =>
                 <li key={item.categoryId}>
                     <Link to={`/categories/${item.categoryId}`}>
                         {item.name}
                     </Link>
                 </li>
         )}
        </ul>
    </nav>
  )
}
export default HeaderDropdown

