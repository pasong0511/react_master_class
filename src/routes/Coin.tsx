import { useParams } from "react-router-dom";

interface RouteParams {
    coinId: string;
}

function Coin() {
    //useParams URL에 있는 정보를 가져옴
    const { coinId } = useParams<RouteParams>();
    return <h1>Coin : {coinId}</h1>;
}

export default Coin;
