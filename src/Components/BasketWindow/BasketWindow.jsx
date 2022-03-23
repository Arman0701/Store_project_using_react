import "./BasketWindow.css";
import CreateItem from "../CreateItem/CreateItem";
import { useState } from "react";

export default function BasketWindow({ toggleBasket, basketData }) {
    const [totalAmount, setTotalAmount] = useState(0);
    console.log(basketData);
    useState(() => {
        setTotalAmount(basketData.reduce((prev, curr) => {
            return prev.price*prev.quantity + curr.price*curr.quantity;
        }));
    }, [basketData.length]);

    return ( 
        <div className="basketWindow">
            <div className="basketHeader">
                <i onClick={toggleBasket} className="fa fa-times"></i>
                <p className="title">Shopping Basket</p>
                <div>Total: {totalAmount} $</div>
            </div>
            <div className="basketItems">
                {
                    basketData.length ? 
                    basketData.map(item => <CreateItem key={item.id} basketMode={true} {...item} />) :
                    <h4>Basket is empty now. Please select some products what you want ...</h4>
                }
            </div>
        </div>
    )
}
