import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css';
import Button from '@mui/joy/Button';

function App() {

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [data3, setData3] = useState([]);
  const [data4, setData4] = useState([]);
  const [data5, setData5] = useState([]);

  const [showData1, setShowData1] = useState(true);
  const [showData2, setShowData2] = useState(false);
  const [showData3, setShowData3] = useState(false);
  const [showData4, setShowData4] = useState(false);
  const [showData5, setShowData5] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setTimeout(setData1(await getData("GDP")), 2000);
      setTimeout(setData2(await getData("CORESTICKM159SFRBATL")), 2000);
      setTimeout(setData3(await getData("UNRATE")), 2000);
      setTimeout(setData4(await getData("SP500")), 2000);
      setTimeout(setData5(await getData("FEDFUNDS")), 2000);
    };

    fetchData();
  }, []);

  const handleData1Click = () => {
    setShowData1(true);
    setShowData2(false);
    setShowData3(false);
    setShowData4(false);
    setShowData5(false);
  };

  const handleData2Click = () => {
    setShowData1(false);
    setShowData2(true);
    setShowData3(false);
    setShowData4(false);
    setShowData5(false);
  };

  const handleData3Click = () => {
    setShowData1(false);
    setShowData2(false);
    setShowData3(true);
    setShowData4(false);
    setShowData5(false);
  };

  const handleData4Click = () => {
    setShowData1(false);
    setShowData2(false);
    setShowData3(false);
    setShowData4(true);
    setShowData5(false);
  };

  const handleData5Click = () => {
    setShowData1(false);
    setShowData2(false);
    setShowData3(false);
    setShowData4(false);
    setShowData5(true);
  };

  // Calculate the y-axis domain based on the selected dataset
  let data = 0;
  if (showData1) data = data1;
  if (showData2) data = data2;
  if (showData3) data = data3;
  if (showData4) data = data4;
  if (showData5) data = data5;

  let values = data.map(d => d.value);
  let minValue = Math.min(...values);
  let maxValue = Math.max(...values);
  let buffer = 0.1; // add 10% buffer space to top and bottom
  // const yMin = Math.round(minValue - buffer * (maxValue - minValue));
  let yMax = Math.round(maxValue + buffer * (maxValue - minValue));

  return (
    <div className="App">
      <header className="App-header">
        <p>Market Performance Visualizer</p>
      </header>
      <div className="Main-content">
        <div className="Sidebar">
          <p>Economic Indicators</p>
          <Button onClick={handleData1Click}>GDP</Button>
          <Button onClick={handleData2Click}>Inflation</Button>
          <Button onClick={handleData3Click}>Unemployment</Button>
          <Button onClick={handleData4Click}>S&P 500</Button>
          <Button onClick={handleData5Click}>Federal Interest</Button>
        </div>
        <LineChart width={1000} height={600}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{fontSize: 12 }} />
          <YAxis domain={[0, yMax]} interval="preserveStartEnd" tickCount={10} tick={{fontSize: 12}}/> {/* Set the y-axis domain */}
          <Tooltip />
          <Legend />
          {showData1 && <Line type="monotsone" dataKey="GDP" data={data1} stroke="#8884d8" tick = {{fontSize: 12}}/>}
          {showData2 && <Line type="monotone" dataKey="Inflation" data={data2} stroke="#82ca9d" tick = {{fontSize: 12}} />}
          {showData3 && <Line type="monotsone" dataKey="Unemployment Rate" data={data3} stroke="#8884d8" tick = {{fontSize: 12}}/>}
          {showData4 && <Line type="monotone" dataKey="S&P 500 Price" data={data4} stroke="#82ca9d" tick = {{fontSize: 12}} />}
          {showData5 && <Line type="monotsone" dataKey="Federal Funds Rate " data={data5} stroke="#8884d8" tick = {{fontSize: 12}}/>}
        </LineChart>
      </div>
    </div>
  );
}

async function getData(series_id) {

  let requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  };

  const proxy = 'https://cors-anywhere.herokuapp.com/';
  const requestUrl = `${proxy}https://api.stlouisfed.org/fred/series/observations?series_id=${series_id}&api_key=fcdeab3eee29ac18a7152128f5e48673&file_type=json`;

  const response = await fetch(requestUrl, requestOptions);
  const data = await response.json();

  console.log(data.observations)
  return data.observations;

}

export default App;