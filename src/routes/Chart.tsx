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

const transedTimestramp = (originTime: number) => {
    const date = new Date(originTime);
    const year = date.getFullYear().toString().slice(-2); //년도 뒤에 두자리
    const month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
    const day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
    return `${month}${day}`;
};

function Chart({ coinId }: ChartProps) {
    const { isLoading, data } = useQuery<IHistoricalData[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId)
        // { refetchInterval: 100000 }
    );

    return (
        <div>
            {isLoading ? (
                "Loading chart..."
            ) : (
                <ApexCharts
                    type="line"
                    series={[
                        {
                            name: "Price",
                            data: data?.map((price) =>
                                Number(price.close)
                            ) as number[],
                        },
                    ]}
                    options={{
                        theme: {
                            mode: "dark",
                        },
                        chart: {
                            height: 400,
                            width: 700,
                            toolbar: {
                                show: false,
                            },
                            background: "transparent",
                        },
                        grid: { show: false },
                        stroke: {
                            curve: "smooth",
                            width: 4,
                        },
                        yaxis: {
                            show: true,
                        },
                        xaxis: {
                            axisBorder: { show: false },
                            axisTicks: { show: false },
                            labels: { show: true },
                            categories: data?.map((price) =>
                                transedTimestramp(price.time_close * 1000)
                            ),
                        },
                        fill: {
                            type: "gradient",
                            gradient: {
                                gradientToColors: ["#e6b3ba"],
                                stops: [0, 100],
                            },
                        },
                        colors: ["#ff606b"],
                        tooltip: {
                            y: {
                                formatter: (value) => `$${value.toFixed(2)}`,
                            },
                        },
                    }}
                ></ApexCharts>
            )}
        </div>
    );
}

export default Chart;
