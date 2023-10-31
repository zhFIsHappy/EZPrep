import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem} from "../types";
import {useLocation} from "react-router-dom";
import {useContext} from "react";
import {CartTypes, cartReducer} from "../reducers/CartReducer";
import {CartContext} from "../contexts/CartContext";

const bookImageFileName = (book: BookItem) => {
    let name = book.title.toLowerCase();
    name = name.replace(/ /g, "-");
    name = name.replace(/'/g, "");
    return `${name}.gif`;
};

function CategoryBookListItem(props: BookItem) {

    const location = useLocation();
    const currentPath = location.pathname;
    const isHomePage = currentPath === '/';
    const {dispatch} = useContext(CartContext);
    const addBookToCart = (book: BookItem) => {
        dispatch({type: CartTypes.ADD, item: book, id: book.bookId});
    };

    return (
        isHomePage ?
            <section className="book">
                <img className="cover" src={props.imageUrl}/>
                <div className="info">
                    <h2>{props.title}</h2>
                    <p>{props.author}</p>
                    {/*<h2>{`$ ${props.price}`}</h2>*/}
                </div>
            </section> :
            <section className="book">
                {
                    props.isPublic && <img
                        className="isPublic"
                        src={require('../assets/images/site/readnow.png')}
                    />
                }
                <img className="cover" src={props.imageUrl}/>
                <div className="info">
                    <h2>{props.title}</h2>
                    <h3>{props.author}</h3>
                    <div className="add-to-cart">
                        <h2>{`$ ${props.price}`}</h2>
                        <img
                            src={require('../assets/images/site/addToCart.png')}
                            onClick={() => addBookToCart(props)}
                        />
                    </div>
                </div>
            </section>
    )
}

export default CategoryBookListItem;
