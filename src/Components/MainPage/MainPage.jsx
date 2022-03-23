import "./MainPage.css";
import CreateItem from "../CreateItem/CreateItem";

export default function MainPage({ apiData }) {
    return (
        <div className="mainPage">
            {apiData?.map((item) => (
                <CreateItem key={item.id} basketMode={false} {...item} />
            ))}
        </div>
    );
}
