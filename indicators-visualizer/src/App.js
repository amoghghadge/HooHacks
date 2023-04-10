import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { LineChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Line } from 'recharts';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';

function App() {

  const [isLoading, setLoading] = useState(true);
  const allData = useMemo(() => [], []);
  const [data, setData] = useState([]);
  const [dataIndex, setDataIndex] = useState(0);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);
  const [buffer, setBuffer] = useState(0.05);
  const [chartTitle, setChartTitle] = useState("");

  useEffect(() => {
    console.log("App loading");

    const fetchData = async () => {
      allData[0] = await getData("GDP");
      allData[1] = await getData("CORESTICKM159SFRBATL");
      allData[2] = await getData("UNRATE");
      allData[3] = await getData("SP500");
      allData[4] = await getData("FEDFUNDS");
    };

    fetchData();
    console.log(allData);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    const values = data.map(d => d.value);
    let min = Math.min(...values);
    let max = Math.max(...values);
    setMinValue(Math.round(min - buffer * (max - min)));
    setMaxValue(Math.round(max + buffer * (max - min)));
    // eslint-disable-next-line
  }, [data])

  const handleData1Click = () => {
    setBuffer(0.1);
    setChartTitle("GDP (Max)");
    setData(allData[0]);
    setDataIndex(0);
  };

  const handleData2Click = () => {
    setBuffer(0.05);
    setChartTitle("Inflation (Max)");
    setData(allData[1]);
    setDataIndex(1);
  };

  const handleData3Click = () => {
    setBuffer(0.01);
    setChartTitle("Unemployment (Max)");
    setData(allData[2]);
    setDataIndex(2);
  };

  const handleData4Click = () => {
    setBuffer(0.2)
    setChartTitle("S&P 500 (Max)");
    setData(allData[3]);
    setDataIndex(3);
  };

  const handleData5Click = () => {
    setBuffer(0.01);
    setChartTitle("Federal Interest (Max)");
    setData(allData[4]);
    setDataIndex(4);
  };

  const oneYearRange = () => {
    let length = allData[dataIndex].length;
    if (dataIndex === 0) {
      setBuffer(0.1);
      setChartTitle("GDP (1y)");
      setData(allData[dataIndex].slice(length-4));
    } else if (dataIndex === 1) {
      setBuffer(0.05);
      setChartTitle("Inflation (1y)");
      setData(allData[dataIndex].slice(length-12));
    } else if (dataIndex === 2) {
      setBuffer(0.01)
      setChartTitle("Unemployment (1y)");
      setData(allData[dataIndex].slice(length-12));
    } else if (dataIndex === 3) {
      setBuffer(0.2)
      setChartTitle("S&P 500 (1y)");
      setData(allData[dataIndex].slice(length-365));
    } else if (dataIndex === 4) {
      setBuffer(0.01);
      setChartTitle("Federal Interest (1y)");
      setData(allData[dataIndex].slice(length-12));
    }
  }

  const fiveYearRange = () => {
    let length = allData[dataIndex].length;
    if (dataIndex === 0) {
      setBuffer(0.1);
      setChartTitle("GDP (5y)");
      setData(allData[dataIndex].slice(length-20));
    } else if (dataIndex === 1) {
      setBuffer(0.05);
      setChartTitle("Inflation (5y)");
      setData(allData[dataIndex].slice(length-60));
    } else if (dataIndex === 2) {
      setBuffer(0.01);
      setChartTitle("Unemployment (5y)");
      setData(allData[dataIndex].slice(length-60));
    } else if (dataIndex === 3) {
      setBuffer(0.2);
      setChartTitle("S&P 500 (5y)");
      setData(allData[dataIndex].slice(length-1825));
    } else if (dataIndex === 4) {
      setBuffer(0.01);
      setChartTitle("Federal Interest (5y)");
      setData(allData[dataIndex].slice(length-60));
    }
  }

  const tenYearRange = () => {
    let length = allData[dataIndex].length;
    if (dataIndex === 0) {
      setBuffer(0.1);
      setChartTitle("GDP (10y)");
      setData(allData[dataIndex].slice(length-40));
    } else if (dataIndex === 1) {
      setBuffer(0.05);
      setChartTitle("Inflation (10y)");
      setData(allData[dataIndex].slice(length-120));
    } else if (dataIndex === 2) {
      setBuffer(0.01);
      setChartTitle("Unemployment (10y)");
      setData(allData[dataIndex].slice(length-120));
    } else if (dataIndex === 3) {
      setBuffer(0.2);
      setChartTitle("S&P 500 (10y)");
      setData(allData[dataIndex]);
    } else if (dataIndex === 4) {
      setBuffer(0.01);
      setChartTitle("Federal Interest (10y)");
      setData(allData[dataIndex].slice(length-120));
    }
  }

  const maxRange = () => {
    if (dataIndex === 0) {
      setBuffer(0.1);
      setChartTitle("GDP (Max)");
    } else if (dataIndex === 1) {
      setBuffer(0.05);
      setChartTitle("Inflation (Max)");
    } else if (dataIndex === 2) {
      setBuffer(0.01);
      setChartTitle("Unemployment (Max)");
    } else if (dataIndex === 3) {
      setBuffer(0.2);
      setChartTitle("S&P 500 (Max)");
    } else if (dataIndex === 4) {
      setBuffer(0.01);
      setChartTitle("Federal Interest (Max)");
    }

    setData(allData[dataIndex]);
  }

  if (isLoading) {
    return (<div className="App" style={{ justifyContent: 'center' }}><CircularProgress size="lg"></CircularProgress></div>)
  }
  return (
    <div className="App">
      <header className="App-header">
        <p>Market Performance Visualizer</p>
      </header>
      <div className="Main-content">
        <div className="Sidebar">
          <p style={{ marginTop: 0, marginBottom: 0 }}>Economic Indicators</p>
          <Button onClick={handleData1Click}>GDP</Button>
          <Button onClick={handleData2Click}>Inflation</Button>
          <Button onClick={handleData3Click}>Unemployment</Button>
          <Button onClick={handleData4Click}>S&P 500</Button>
          <Button onClick={handleData5Click}>Federal Interest</Button>
        </div>
        <div className="Main">
          <div className="Data-selector">
            <Button variant="outlined" size="sm" onClick={oneYearRange}>1y</Button>
            <Button variant="outlined" size="sm" onClick={fiveYearRange}>5y</Button>
            <Button variant="outlined" size="sm" onClick={tenYearRange}>10y</Button>
            <Button variant="outlined" size="sm" onClick={maxRange}>Max</Button>
          </div>
          <LineChart width={1000} height={600}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={[minValue, maxValue]} interval="preserveStartEnd" tickCount={10} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line isAnimationActive={false} name={chartTitle} type="monotone" dataKey="value" data={data} stroke="#0A6ADD" tick={{ fontSize: 12 }} />
          </LineChart>
        </div>
      </div>
    </div>
  );

  async function getData(series_id) {
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Origin': `${window.location.origin.toString()}`,
        'X-Requested-With': 'XMLHttpRequest',
        'x-cors-api-key': `${process.env.REACT_APP_CORSKEY}`
      }
    };

    const proxy = 'https://proxy.cors.sh/';
    const requestUrl = `${proxy}https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=${process.env.REACT_APP_FREDKEY}&file_type=json`;

    const response = await fetch(requestUrl, requestOptions);
    const data = await response.json();

    console.log(data.observations);

    if (series_id === "GDP") {
      return data.observations.slice(4);
    }

    if (series_id === "FEDFUNDS") {
      handleData1Click();
      setLoading(false);
    }

    return data.observations;
  }

}

export default App;