import "./App.css";
import { useEffect, useState } from "react";
import BasketWindow from "./Components/BasketWindow/BasketWindow";
import Header from "./Components/Header/Header";
import MainPage from "./Components/MainPage/MainPage";

import { ToBasketContext } from "./context";

export default function App() {
    const [apiData, setApiData] = useState(JSON.parse(localStorage.getItem("apiData")));
    const [isShowBasket, setIsShowBasket] = useState(false);
    const [basketData, setBasketData] = useState([]);

    useEffect(() => {
        if (!apiData) {
            async function getData(url) {
                const res = await fetch(url);
                const data = await res.json();
                const newData = data.map((item) => {
                    return { quantity: 1,  ...item };
                });

                localStorage.setItem("apiData", JSON.stringify(newData));
                setApiData(newData);
            }

            getData("https://fakestoreapi.com/products/");
        }
    }, [apiData]);

    const toBasket = { apiData, setApiData, basketData, setBasketData };

    function toggleBasket() {
        setIsShowBasket(!isShowBasket);
    }

    return (
        <div className="App">
            {!isShowBasket && (
                <Header basketLength={basketData.length} toggleBasket={toggleBasket} />
            )}
            {!isShowBasket && (
                <ToBasketContext.Provider value={toBasket}>
                    <MainPage apiData={apiData} />
                </ToBasketContext.Provider>
            )}
            {isShowBasket && (
                <ToBasketContext.Provider value={toBasket}>
                    <BasketWindow basketData={basketData} toggleBasket={toggleBasket} />
                </ToBasketContext.Provider>
            )}
        </div>
    );
}
