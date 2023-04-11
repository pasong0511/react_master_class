import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

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

const Loader = styled.span`
    text-align: center;
    display: block;
`;

interface RouteParams {
    coinId: string;
}

interface RounteState {
    name: string;
}

function Coin() {
    //useParams URL에 있는 정보를 가져옴
    const { coinId } = useParams<RouteParams>();
    const { state } = useLocation<RounteState>(); // dom V6 -> const name = location.state as RouterState;
    const [loading, setLoading] = useState(true);

    return (
        <Container>
            <Header>
                <Title>{state?.name || "Loading"}</Title>
            </Header>
            {loading ? <Loader>로딩</Loader> : null}
        </Container>
    );
}

export default Coin;
