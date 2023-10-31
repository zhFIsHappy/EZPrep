import HeaderDropdown from './HeaderDropdown';
import {Link} from 'react-router-dom';
import '../assets/css/global.css'
import '../assets/css/AppHeader.css';
import {CategoryItem} from "../types";
import {useContext} from "react";
import {CartContext} from "../contexts/CartContext";

function AppHeader() {
    const {cart} = useContext(CartContext);

    return (
        <header className="container">
            <section className="bookstore-logo">
                <Link to="/">
                    <img
                        src={require('../assets/images/site/logo.png')}
                        alt="Greenlight Bookstore Logo"
                    />
                </Link>
            </section>
            <section className="group-category">
                <div><HeaderDropdown/></div>
                <div><Link to="/categories"> Best Seller</Link></div>
                <div><Link to="/categories"> New Releases</Link></div>
            </section>

            <section className="group-button">
                <button className="search">
                    <img
                        src={require('../assets/images/site/icons/Iconsearch.png')}
                        alt="Iconsearch"
                    />
                    <form action="">
                        <input type="text" className="search-bar"/><br/>
                    </form>
                </button>
                <button className="cart">
                    <img
                        src={require('../assets/images/site/icons/Iconcart.png')}
                        alt="cartIcon"
                    />
                    cart ({cart.length})
                </button>
                <button className="login">
                    <img
                        src={require('../assets/images/site/icons/Iconprofile.png')}
                        alt="profileIcon"
                    />
                    login
                </button>
            </section>
        </header>
    )
}

export default AppHeader;

