import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './App.css';
import Button from '@mui/joy/Button';

function App() {

  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [showData1, setShowData1] = useState(true);
  const [showData2, setShowData2] = useState(false);
  const [overlay, setOverlay] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // CORS proxy
      const data1Url = `${proxyUrl}https://api.stlouisfed.org/fred/series/observations?series_id=GDPC1&api_key=ca9ed27073180b232d1de51a65d9d6f0&file_type=json`;
      const data2Url = `${proxyUrl}https://api.stlouisfed.org/fred/series/observations?series_id=UNRATE&api_key=ca9ed27073180b232d1de51a65d9d6f0&file_type=json`;

      const response1 = await fetch(data1Url);
      const json1 = await response1.json();
      setData1(json1.observations);

      const response2 = await fetch(data2Url);
      const json2 = await response2.json();
      setData2(json2.observations);
    };

    fetchData();
  }, []);

  const handleData1Click = () => {
    setShowData1(true);
    setShowData2(false);
  };

  const handleData2Click = () => {
    setShowData1(false);
    setShowData2(true);
  };

  const handleOverlayChange = () => {
    setOverlay(!overlay);
  };

  // Calculate the y-axis domain based on the selected dataset
  const data = showData1 ? data1 : data2;
  const values = data.map(d => d.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);
  const buffer = 0.1; // add 10% buffer space to top and bottom
  // const yMin = Math.round(minValue - buffer * (maxValue - minValue));
  const yMax = Math.round((maxValue) / 5000) * 5000;

  return (
    <div className="App">
      <header className="App-header">
        <p>Market Performance Visualizer</p>
      </header>
      <Button onClick={() => getData("GDP")}>Button</Button>
      <div>
        <button onClick={handleData1Click}>Data 1</button>
        <button onClick={handleData2Click}>Data 2</button>
        <label>
          <input type="checkbox" checked={overlay} onChange={handleOverlayChange} />
          Overlay
        </label>
        <LineChart width={1200} height={500}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis domain={[0, yMax]} interval="preserveStartEnd" tickCount={10}/> {/* Set the y-axis domain */}
          <Tooltip />
          <Legend />
          {showData1 && <Line type="monotone" dataKey="value" data={data1} stroke="#8884d8" />}
          {showData2 && <Line type="monotone" dataKey="value" data={data2} stroke="#82ca9d" />}
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
  console.log(data.observations);

  return data.observations;

}

export default App;