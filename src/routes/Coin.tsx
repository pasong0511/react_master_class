import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import {
    Switch,
    Route,
    useLocation,
    useParams,
    useRouteMatch,
} from "react-router-dom";
import { useQuery } from "react-query";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { fetchCoinInfo, fetchTickersInfo } from "../api";
import Candle from "./Candle";

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
`;

const Header = styled.header`
    height: 15vh;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin: 10px 0 0 10px;
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Overview = styled.div`
    display: flex;
    justify-content: space-between;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;
const OverviewItem = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    span:first-child {
        font-size: 10px;
        font-weight: 400;
        text-transform: uppercase;
        margin-bottom: 5px;
    }
`;
const Description = styled.p`
    margin: 20px 0px;
`;

const Tabs = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    margin: 25px 0px;
    gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
    text-align: center;
    text-transform: uppercase;
    font-size: 12px;
    font-weight: 400;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 7px 0px;
    border-radius: 10px;
    color: ${(props) =>
        props.isActive ? props.theme.accentColor : props.theme.textColor};
    a {
        display: block;
        color: #ffffff;
    }
`;

//Object.keys(temp1).join();
//Object.values(temp1).map(v => typeof v).join();

interface RouteParams {
    coinId: string;
}

interface RounteState {
    name: string;
}

interface Itags {
    coin_counter: number;
    ico_counter: number;
    id: string;
    name: string;
}

interface ITeam {
    id: string;
    name: string;
    position: string;
}

interface IInfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    tags: Itags[];
    team: ITeam[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    first_data_at: string;
    last_data_at: string;
}

interface IPriceData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: {
        USD: {
            ath_date: string;
            ath_price: number;
            market_cap: number;
            market_cap_change_24h: number;
            percent_change_1h: number;
            percent_change_1y: number;
            percent_change_6h: number;
            percent_change_7d: number;
            percent_change_12h: number;
            percent_change_15m: number;
            percent_change_24h: number;
            percent_change_30d: number;
            percent_change_30m: number;
            percent_from_price_ath: number;
            price: number;
            volume_24h: number;
            volume_24h_change_24h: number;
        };
    };
}

interface ICoinProps {
    isDark: boolean;
}

function Coin({ isDark }: ICoinProps) {
    //useParams URL에 있는 정보를 가져옴
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RounteState>(); // dom V6 -> const name = location.state as RouterState;

    const priceMatch = useRouteMatch("/:coinId/price"); //URL에 coinId/price라는 URL이 있는지 확인해달라는 훅
    const chartMatch = useRouteMatch("/:coinId/chart"); //존재하는 경우 isExact: true 반환

    //고유한 값이여 야하기 때문에 키 값을 살짝 변경
    const { isLoading: infoLoding, data: infoData } = useQuery<IInfoData>(
        ["info", coinId],
        () => fetchCoinInfo(coinId)
        // { refetchInterval: 500000 }
    );
    const { isLoading: tickersLoding, data: tickersData } =
        useQuery<IPriceData>(["tickers", coinId], () =>
            fetchTickersInfo(coinId)
        );

    /*
    const [loading, setLoading] = useState(true);
    const [info, setInfo] = useState<IInfoData>();
    const [priceInfo, setPriceInfo] = useState<IPriceData>();
    useEffect(() => {
        //즉시 실행함수
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();

            const priceData = await (
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();

            setInfo(infoData);
            setPriceInfo(priceData);
            setLoading(false);
        })();
    }, [coinId]);
     */

    const loading = infoLoding || tickersLoding;

    //console.log(tickersData?.quotes.USD);

    return (
        <Container>
            <Helmet>
                <title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading..."
                        : infoData?.name}
                </title>
            </Helmet>
            <Header>
                <Title>
                    {state?.name
                        ? state.name
                        : loading
                        ? "Loading..."
                        : infoData?.name}
                </Title>
                <Img
                    src={`https://coinicons-api.vercel.app/api/icon/${infoData?.symbol.toLowerCase()}`}
                />
            </Header>
            {loading ? (
                <Loader>로딩</Loader>
            ) : (
                <>
                    <Overview>
                        <OverviewItem>
                            <span>Rank:</span>
                            <span>{infoData?.rank}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Symbol:</span>
                            <span>${infoData?.symbol}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Price:</span>
                            <span>{tickersData?.quotes.USD.price}</span>
                        </OverviewItem>
                    </Overview>
                    <Description>{infoData?.description}</Description>
                    <Overview>
                        <OverviewItem>
                            <span>Total Suply:</span>
                            <span>{tickersData?.total_supply}</span>
                        </OverviewItem>
                        <OverviewItem>
                            <span>Max Supply:</span>
                            <span>{tickersData?.max_supply}</span>
                        </OverviewItem>
                    </Overview>

                    {/* Link는 URL을 변경 <a> 엘리먼트 같음*/}
                    <Tabs>
                        <Tab isActive={chartMatch !== null}>
                            <Link to={`/${coinId}/chart`}>Chart</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/candle`}>Candle</Link>
                        </Tab>
                        <Tab isActive={priceMatch !== null}>
                            <Link to={`/${coinId}/price`}>Price</Link>
                        </Tab>
                    </Tabs>

                    {/* <Switch> 는 첫번째로 매칭되는 path 를 가진 컴포넌트를 렌더링 */}
                    {/* Link로 변경한 URL에 맞춰 하위 컴포넌트만 리렌더링 */}
                    <Switch>
                        <Route path={`/${coinId}/price`}>
                            <Price tickersData={tickersData?.quotes.USD} />
                        </Route>
                        <Route path={`/${coinId}/chart`}>
                            <Chart isDark={isDark} coinId={coinId} />
                        </Route>
                        <Route path={`/${coinId}/candle`}>
                            <Candle coinId={coinId} />
                        </Route>
                    </Switch>
                </>
            )}
        </Container>
    );
}

export default Coin;
