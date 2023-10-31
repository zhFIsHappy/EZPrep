import '../assets/css/AppFooter.css'
import '../assets/css/global.css'
import {Link} from "react-router-dom";


function AppFooter() {
    return (
        <footer className="container">
            <section className="links">
                <Link to="/">about</Link>
                |
                <Link to="/">contact</Link>
                |
                <Link to="/">directions</Link>
            </section>
            <section className="links">
                ©2023 GreenLight Book. Copy rights reserved.
            </section>
            <section className="social-media-icons">
                <img
                    src={require('../assets/images/site/icons/social-fb.png')}
                    alt="socialFbIcon"
                />
                <img
                    src={require('../assets/images/site/icons/social-ins.png')}
                    alt="socialInsIcon"
                />
                <img
                    src={require('../assets/images/site/icons/social-linin.png')}
                    alt="socialLinkedinIcon"
                />
                <img
                    src={require('../assets/images/site/icons/social-X.png')}
                    alt="socialXIcon"
                />
            </section>
        </footer>
    )
}

export default AppFooter;
