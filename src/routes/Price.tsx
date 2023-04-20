import { useQueries } from "react-query";
import styled from "styled-components";

const Container = styled.div`
    max-width: 480px;
    margin: 0 auto;
`;

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 6rem;
    gap: 1rem;
`;

const GridItem = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;

    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const BigGridItem = styled.div`
    display: flex;
    align-items: center;
    flex-direction: row;
    grid-column: 1 / 3;
    grid-row: 1 / 2;
    padding: 1.2rem;
    justify-content: space-between;

    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px 20px;
    border-radius: 10px;
`;

const PriceText = styled.div`
    color: tomato;
`;

const PriceLabel = styled.div`
    color: teal;
`;

interface IUSDData {
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
}

function Price({ tickersData }: any) {
    if (!tickersData) {
        return <></>;
    }

    return (
        <Container>
            <GridContainer>
                <BigGridItem>
                    <PriceLabel>최고가 달성</PriceLabel>
                    <PriceText>${tickersData.ath_price.toFixed(3)}</PriceText>
                </BigGridItem>
                <GridItem>
                    <PriceLabel>1시간 전보다</PriceLabel>
                    <PriceText>{tickersData.percent_change_1h}</PriceText>
                </GridItem>
                <GridItem>
                    <PriceLabel>6시간 전보다</PriceLabel>
                    <PriceText>{tickersData.percent_change_6h}</PriceText>
                </GridItem>
                <GridItem>
                    <PriceLabel>12시간 전보다</PriceLabel>
                    <PriceText>{tickersData.percent_change_12h}</PriceText>
                </GridItem>
                <GridItem>
                    <PriceLabel>24시간 전보다</PriceLabel>
                    <PriceText>{tickersData.percent_change_24h}</PriceText>
                </GridItem>
                <GridItem>
                    <PriceLabel>7일 전보다</PriceLabel>
                    <PriceText>{tickersData.percent_change_7d}</PriceText>
                </GridItem>
                <GridItem>
                    <PriceLabel>30일 전보다</PriceLabel>
                    <PriceText>{tickersData.percent_change_30d}</PriceText>
                </GridItem>
            </GridContainer>
        </Container>
    );
}

export default Price;
