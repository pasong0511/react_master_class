import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexCharts from "react-apexcharts";

interface IHistoricalData {
    time_open: number;
    time_close: number;
    open: string;
    high: string;
    low: string;
    close: string;
    volume: string;
    market_cap: number;
}

interface ChartProps {
    coinId: string;
}

function Candle({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistoricalData[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        { refetchInterval: 10000 }
    );

    //console.log(data);

    const chandleDataList = data?.map((item) => ({
        x: new Date(item.time_close),
        y: [
            Number(item.close),
            Number(item.high),
            Number(item.low),
            Number(item.open),
        ],
    }));
    //물어보기
    //console.log("데이터", chandleDataList);

    return (
        <div>
            {isLoading ? (
                "Loading Candle..."
            ) : (
                <ApexCharts
                    type="candlestick"
                    series={[
                        {
                            data: [
                                {
                                    x: new Date(1538778600000),
                                    y: [6629.81, 6650.5, 6623.04, 6633.33],
                                },
                                {
                                    x: new Date(1538780400000),
                                    y: [6632.01, 6643.59, 6620, 6630.11],
                                },
                                {
                                    x: new Date(1538782200000),
                                    y: [6630.71, 6648.95, 6623.34, 6635.65],
                                },
                                {
                                    x: new Date(1538784000000),
                                    y: [6635.65, 6651, 6629.67, 6638.24],
                                },
                                {
                                    x: new Date(1538785800000),
                                    y: [6638.24, 6640, 6620, 6624.47],
                                },
                                {
                                    x: new Date(1538787600000),
                                    y: [6624.53, 6636.03, 6621.68, 6624.31],
                                },
                            ],
                        },
                    ]}
                    options={{}}
                ></ApexCharts>
            )}
        </div>
    );
}

export default Candle;
