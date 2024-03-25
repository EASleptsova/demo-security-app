import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { data } from "../../data";

export function SecurityDetail() {
  const { symbol } = useParams();

  const foundSecurity = data.find((security) => security.ticker === symbol);
  /* NOTE: for demo purposes use mock data if api is not available */
  const [security, setSecurity] = useState(foundSecurity);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchSecurity = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(
          `http://localhost:7000/securities/${symbol}`
        );
        const data = await response.json();
        setSecurity(data);
        setIsLoading(false);
      } catch (e) {
        console.error("Error fetching security data", e);
        setIsLoading(false);
      }
    };

    fetchSecurity();
  }, [symbol]);

  if (!security) return <h1>No data found</h1>;

  const close = security.prices.map((item) => [
    new Date(item.date).getTime(),
    Number(item.close),
  ]);
  const volume = security.prices.map((item) => [
    new Date(item.date).getTime(),
    Number(item.volume),
  ]);

  const options = {
    title: {
      text: "Security Detail chart",
    },
    yAxis: [
      {
        title: {
          text: "Stock",
        },
      },
      {
        opposite: true,
        title: {
          text: "Volume",
        },
      },
    ],
    series: [
      {
        yAxis: 0,
        data: close,
        name: "Stock",
      },
      {
        yAxis: 1,
        data: volume,
        name: "Volume",
      },
    ],
    xAxis: {
      type: "datetime",
      minRange: 1000 * 60 * 60 * 24 * 2, // maximum zoom allowed: 2 days
      units: [["month", [1]]],
    },
  };

  return (
    <div className="app-wrapper">
      <h1>Security Detail</h1>
      {isLoading ? (
        <h4>Loading...</h4>
      ) : (
        <>
          <h2>
            {symbol} {security?.securityName}
          </h2>
          <br />
          <h3>Sector: {security?.sector}</h3>
          <h3>Country: {security?.country}</h3>

          <HighchartsReact highcharts={Highcharts} options={options} />
        </>
      )}
    </div>
  );
}
