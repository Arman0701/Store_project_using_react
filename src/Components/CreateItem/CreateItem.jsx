import "./CreateItem.css";
import { ToBasketContext } from '../../context';
import { useContext, useState } from 'react';
 
export default function CreateItem(props) {
    const basketContext = useContext(ToBasketContext);
    const [localCount, setLocalCount] = useState(props.quantity);

    function decrease() {
        basketContext.apiData.forEach(item => {
            if (item.id === props.id && item.quantity > 1) {
                item.quantity -= 1; 
                setLocalCount(prev => prev - 1);
            }
        })
        basketContext.setApiData([...basketContext.apiData]);
    }
    function increase() {
        basketContext.apiData.forEach(item => {
            if (item.id === props.id && item.quantity < props.rating.count) {
                item.quantity += 1; 
                setLocalCount(prev => prev + 1);
            }
        })
        basketContext.setApiData([...basketContext.apiData]);
    }

    function addToBasket() {
        basketContext.apiData.forEach(item => {
            if (! basketContext.basketData.includes(item) && item.id === props.id) {
                basketContext.setBasketData([
                    ...basketContext.basketData,
                    { quantity: localCount, ...item }
                ]);
            }
        });
    }

    function removeItem(){
        basketContext.setBasketData(
            basketContext.basketData.filter(item => item.id !== props.id)
        )
        basketContext.setApiData(basketContext.apiData.map(item => {
            if (item.id === props.id) item.quantity = 1;
            return item;
        }))
    }        

    return (
        <div className="pageItem">
            <div style={{ backgroundImage: `url(${props.image})` }} className="itemImage"></div>
            <div className="title">{ props.title }</div>
            <div className="description">Product Description <i className="fa fa-chevron-down"></i></div>
            <div className="price">Price: {props.price} $</div>
            <div className="rating">Rating: {props.rating.rate} <i className="far fa-star"></i></div>
            <div className="productCounter">
                <i onClick={decrease} className="fa fa-minus"></i>
                <div className="count">{ !props.basketMode ? localCount : basketContext.apiData.map(item => {
                    if (item.id === props.id){
                        return item.quantity;
                    }
                    return null;
                }) }</div>
                <i onClick={increase} className="fa fa-plus"></i>
            </div>
            {
                props.basketMode ? <>
                    <div onClick={removeItem} className="removeButton">
                        Remove
                        <i className="fa fa-trash"></i>
                    </div>
                </> : <>
                    <div onClick={addToBasket} className="addButton">
                        Add to basket
                        <i className="fa fa-shopping-cart"></i>
                    </div>

                </>
            }
        </div>
    )
}
