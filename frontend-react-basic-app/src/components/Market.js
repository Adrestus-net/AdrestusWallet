import {MdPieChart} from "react-icons/md";
import {
    lineChartDataMiniArea1,
    lineChartDataMiniArea2,
    lineChartOptionsMiniArea1,
    lineChartOptionsMiniArea2,
} from "../variables/charts";
import Card from "./card";
import Stock from "./charts/Stock";
import LineChart from "./charts/LineChart";
import React from "react";

const Market = (props) => {
    const {moedas} = props
    return (
        <Card
            extra={
                "w-full h-2/5 hover:overflow-y-scroll  py-4 px-[33px] mx-1"
            }
        >
            {/* Header */}
            <div className="mt-[10px] flex items-center justify-between">
                <h5 className="text-lg font-bold text-navy-700 dark:text-white">
                    Market
                </h5>
                <button
                    className="z-[1] flex items-center justify-center rounded-lg bg-lightPrimary p-2 text-brand-500 transition duration-200 hover:bg-gray-100 active:bg-gray-200 dark:bg-navy-700 dark:text-white dark:hover:bg-white/20 dark:active:bg-white/10">
                    <MdPieChart/>
                </button>
            </div>
            {/* stock */}
            <div className="mt-3">
                {moedas == null &&
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className="text-lg font-medium text-gray-800">Empty transactions</p>
                    </div>
                }
                {moedas.length === 0 &&
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <p className="text-lg font-medium text-gray-800">Empty transactions</p>
                    </div>
                }
                {moedas.length !== 0 &&
                    moedas.map((item) =>
                        <Stock
                            name={item.symbol}
                            sum={item.current_price}
                            growth={String(item.price_change_24h)}
                            chart={
                                String(item.price_change_24h).includes('-') ?
                                    <LineChart
                                        chartData={lineChartDataMiniArea2}
                                        chartOptions={lineChartOptionsMiniArea2}
                                    />
                                    :
                                    <LineChart
                                        chartData={lineChartDataMiniArea1}
                                        chartOptions={lineChartOptionsMiniArea1}
                                    />
                            }
                        />
                    )
                }
                {/*<Stock*/}
                {/*    name="TSLA"*/}
                {/*    sum="3,485.9"*/}
                {/*    growth="-1.51%"*/}
                {/*    chart={*/}
                {/*        <LineChart*/}
                {/*            chartData={lineChartDataMiniArea2}*/}
                {/*            chartOptions={lineChartOptionsMiniArea2}*/}
                {/*        />*/}
                {/*    }*/}
                {/*/>*/}
                {/*<Stock*/}
                {/*    name="PFE"*/}
                {/*    sum="120.4"*/}
                {/*    growth="-1.51%"*/}
                {/*    chart={*/}
                {/*        <LineChart*/}
                {/*            chartData={lineChartDataMiniArea2}*/}
                {/*            chartOptions={lineChartOptionsMiniArea2}*/}
                {/*        />*/}
                {/*    }*/}
                {/*/>*/}
                {/*<Stock*/}
                {/*    name="XPEV"*/}
                {/*    sum="350.4"*/}
                {/*    growth="+2.45"*/}
                {/*    chart={*/}
                {/*        <LineChart*/}
                {/*            chartData={lineChartDataMiniArea1}*/}
                {/*            chartOptions={lineChartOptionsMiniArea1}*/}
                {/*        />*/}
                {/*    }*/}
                {/*/>*/}
                {/*<Stock*/}
                {/*    name="BNB"*/}
                {/*    date="September, 07 2021"*/}
                {/*    sum="2,983.2"*/}
                {/*    growth="-1.51%"*/}
                {/*    chart={*/}
                {/*        <LineChart*/}
                {/*            chartData={lineChartDataMiniArea2}*/}
                {/*            chartOptions={lineChartOptionsMiniArea2}*/}
                {/*        />*/}
                {/*    }*/}
                {/*/>*/}
                {/*<Stock*/}
                {/*    name="MSFT"*/}
                {/*    sum="309.4"*/}
                {/*    growth="+4.45"*/}
                {/*    chart={*/}
                {/*        <LineChart*/}
                {/*            chartData={lineChartDataMiniArea1}*/}
                {/*            chartOptions={lineChartOptionsMiniArea1}*/}
                {/*        />*/}
                {/*    }*/}
                {/*/>*/}
            </div>
        </Card>
    );
};

export default Market;
