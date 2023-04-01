import React, { useState, useEffect, useMemo } from 'react';
import './App.css';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Button from '@mui/joy/Button';
import CircularProgress from '@mui/joy/CircularProgress';

function App() {

  const allData = useMemo(() => [], []);
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(0);

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
    setMinValue(Math.min(...values));
    setMaxValue(Math.max(...values));
  }, [data])

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
          <Button onClick={() => setData(allData[0])}>GDP</Button>
          <Button onClick={() => setData(allData[1])}>Inflation</Button>
          <Button onClick={() => setData(allData[2])}>Unemployment</Button>
          <Button onClick={() => setData(allData[3])}>S&P 500</Button>
          <Button onClick={() => setData(allData[4])}>Federal Interest</Button>
        </div>
        <div className="Main">
          <div className="Data-selector">
            <Button variant="outlined" size="sm">1Y</Button>
            <Button variant="outlined" size="sm">5Y</Button>
            <Button variant="outlined" size="sm">10Y</Button>
            <Button variant="outlined" size="sm">Max</Button>
          </div>
          <LineChart width={1000} height={600}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" tick={{ fontSize: 12 }} />
            <YAxis domain={[minValue, maxValue]} interval="preserveStartEnd" tickCount={10} tick={{ fontSize: 12 }} />
            <Tooltip />
            <Legend />
            <Line type="monotsone" dataKey="value" data={data} stroke="#8884d8" tick={{ fontSize: 12 }} />
          </LineChart>
        </div>
      </div>
    </div>
  );

  async function getData(series_id) {
    let requestOptions = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    };

    // const proxy = 'https://proxy.cors.sh/';
    const proxy = 'https://cors-anywhere.herokuapp.com/';
    const requestUrl = `${proxy}https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=fcdeab3eee29ac18a7152128f5e48673&file_type=json`;

    const response = await fetch(requestUrl, requestOptions);
    const data = await response.json();

    console.log(data.observations);

    if (series_id === "GDP") {
      return data.observations.slice(4);
    }

    if (series_id === "FEDFUNDS") {
      setData(allData[0]);
      setLoading(false);
    }

    return data.observations;
  }

}

export default App;