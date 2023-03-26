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
      setData1(await getData("GDP"));
      setData2(await getData("CORESTICKM159SFRBATL"));
      setData3(await getData("UNRATE"));
      setData4(await getData("SP500"));
      setData5(await getData("FEDFUNDS"));
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
          {showData1 && <YAxis domain={[0, 28000]} interval="preserveStartEnd" tickCount={10} tick={{fontSize: 12}}/>}
          {!showData1 && !showData5 && <YAxis interval="preserveStartEnd" tickCount={10} tick={{fontSize: 12}}/>}
          {showData5 && <YAxis domain={[0, 20]} interval="preserveStartEnd" tickCount={10} tick={{fontSize: 12}}/>}
          <Tooltip />
          <Legend />
          {showData1 && <Line type="monotsone" label="GDP" dataKey="value" data={data1} stroke="#8884d8" tick = {{fontSize: 12}}/>}
          {showData2 && <Line type="monotsone" label="Inflation Rate" dataKey="value" data={data2} stroke="#82ca9d" tick = {{fontSize: 12}} />}
          {showData3 && <Line type="monotssone" label="Unemployment Rate" dataKey="value" data={data3} stroke="#8884d8" tick = {{fontSize: 12}}/>}
          {showData4 && <Line type="monotsone" label="S&P 500 Price" dataKey="value" data={data4} stroke="#82ca9d" tick = {{fontSize: 12}} />}
          {showData5 && <Line type="monotsone" label="Federal Funds Rate" dataKey="value" data={data5} stroke="#8884d8" tick = {{fontSize: 12}}/>}
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