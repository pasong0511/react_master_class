import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { fetchCoins } from "../api";

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

const CoinsList = styled.ul``;

const Coin = styled.li`
    background-color: white;
    color: ${(props) => props.theme.bgColor};
    border-radius: 15px;
    margin-bottom: 10px;
    a {
        display: flex;
        align-items: center;
        padding: 20px;
        transition: color 0.2s ease-in;
    }
    &:hover {
        a {
            color: ${(props) => props.theme.accentColor};
        }
    }
`;

const Title = styled.h1`
    font-size: 48px;
    color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
    text-align: center;
    display: block;
`;

const Img = styled.img`
    width: 35px;
    height: 35px;
    margin-right: 10px;
`;

interface ICoin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
}

interface ICoinsProps {
    toggleDark: () => void;
}

function Coins({ toggleDark }: ICoinsProps) {
    const { isLoading, data } = useQuery<ICoin[]>(["allCoins"], fetchCoins);
    /*const [coins, setCoins] = useState([]); //타입을 갖은 배열이라고 알려줌
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        //즉시 실행함수
        (async () => {
            const response = await fetch(
                "https://api.coinpaprika.com/v1/coins"
            );
            const json = await response.json();
            setCoins(json.slice(0, 100));
            setLoading(false);
        })();
    }, []);*/

    return (
        <Container>
            <Helmet>
                <title>Coin List</title>
            </Helmet>
            <Header>
                <Title>Coin List 💰</Title>
                <button onClick={toggleDark}>Toggle Mode</button>
            </Header>
            {isLoading ? (
                <Loader>로딩</Loader>
            ) : (
                <CoinsList>
                    {data?.slice(0, 100).map((coin) => (
                        <Coin key={coin.id}>
                            <Link
                                to={{
                                    pathname: `/${coin.id}`,
                                    state: { name: coin.name },
                                }}
                            >
                                <Img
                                    src={`https://coinicons-api.vercel.app/api/icon/${coin.symbol.toLowerCase()}`}
                                />
                                {coin.name} &rarr;
                            </Link>
                        </Coin>
                    ))}
                </CoinsList>
            )}
        </Container>
    );
}
export default Coins;
