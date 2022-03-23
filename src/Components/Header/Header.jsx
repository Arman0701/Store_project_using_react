import "./Header.css";

export default function Header({ toggleBasket, basketLength }) {
    return (
        <div className="App-header">
            <div className="logo">LOGO</div>
            <div className="menu">
                <div onClick={toggleBasket} className="basket">
                    Basket
                    <i className="fa fa-shopping-cart"></i>
                    <div className="itemsCounter">{basketLength}</div>
                </div>
                <div className="categories">
                    Categories
                    <i className="fa fa-bars"></i>
                </div>
            </div>
        </div>
    )
}
