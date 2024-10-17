import React, { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import tradingview from '../../../../images/tradingview.png';
import { WSconnect } from '../../../utils/axiossonfig'; // Importa la configuración de Axios

const intervals = [
  { value: '1m', label: '1 Minuto' },
  { value: '3m', label: '3 Minutos' },
  { value: '5m', label: '5 Minutos' },
  { value: '15m', label: '15 Minutos' },
  { value: '30m', label: '30 Minutos' },
  { value: '1h', label: '1 Hora' },

];

const backgroundStyle = {
  backgroundImage: `url(${tradingview})`,
  backgroundPosition: 'center',
  backgroundSize: 'cover', // Asegura que la imagen cubra todo el contenedor sin distorsión
  backgroundRepeat: 'no-repeat', // Evita que la imagen se repita
  filter: 'blur(20px)', // Aplica el filtro de desenfoque directamente a la imagen
};

const TradingViewChart = ({ tableName, chainNet, SetOpenDonate }) => {
  const chartContainerRef = useRef();
  const candleSeriesRef = useRef();
  const [interval, setInterval] = useState('1m');
  const [ws, setWs] = useState(null);
  const [dataMsg, setDataMsg] = useState([]);

  useEffect(() => {
    if (tableName && chainNet && tableName.trim() !== '' && chainNet.trim() !== '') {
      const newWs = new WebSocket(WSconnect);

      newWs.onopen = () => {
        console.log('Connected to WebSocket');
        newWs.send(JSON.stringify({ tableName, chainNet, interval }));
      };
  
      newWs.onmessage = (event) => {
        const data = JSON.parse(event.data);
        setDataMsg(data);
  
        if (Array.isArray(data)) {
          const transformedData = data.map(item => ({
            time: item[0] / 1000,
            open: parseFloat(item[1]),
            high: parseFloat(item[2]),
            low: parseFloat(item[3]),
            close: parseFloat(item[4])
          }));
          console.log("data is array", data)

          if (dataMsg) {
            const width = chartContainerRef.current.clientWidth;
            const height = chartContainerRef.current.clientHeight;
            console.log("inside char container")
            if (!candleSeriesRef.current) {
              console.log("inside candle series ref");
              const chart = createChart(chartContainerRef.current, {
                width: width,
                height: height,
                layout: { background: { color: '#000000' }, textColor: '#ffffff' },
                grid: { vertLines: { color: 'transparent' }, horzLines: { color: 'transparent' } },
              });
  
              const candleSeries = chart.addCandlestickSeries();
              candleSeries.setData(transformedData);
              candleSeriesRef.current = candleSeries;
    
              window.addEventListener('resize', () => {
                chart.resize(chartContainerRef.current.clientWidth, chartContainerRef.current.clientHeight);
              });
            } else {
            candleSeriesRef.current.setData(transformedData);
            }
          } else {
            console.error('Chart container is not available.');
            if (candleSeriesRef.current) {
              candleSeriesRef.current.setData([]);
            }
          };
        };
      };
  
      newWs.onclose = () => console.log('WebSocket connection closed');
      newWs.onerror = (error) => console.error('WebSocket error:', error);
  
      setWs(newWs);
  
      return () => {
        if (candleSeriesRef.current && candleSeriesRef.current.chart) {
          candleSeriesRef.current.chart.remove();
          candleSeriesRef.current = null;
        }
        newWs.close();
      };
    }
  }, [tableName, chainNet, interval, chartContainerRef.current]);
  
  useEffect(() => {
    if (chartContainerRef.current) {
      console.log('Chart container is available');
    } else {
      console.error('Chart container is not available');
    }
  }, [chartContainerRef.current]);

  
  const handleDonateClick = () => {
    SetOpenDonate(true);
  };

  return (
    <div className="h-full w-full bg-black relative">
      <select
        value={interval}
        onChange={(e) => setInterval(e.target.value)}
        className="mb-2 bg-gray-800 text-white border border-gray-600 rounded p-2"
      >
        {intervals.map((intvl) => (
          <option key={intvl.value} value={intvl.value}>
            {intvl.label}
          </option>
        ))}
      </select>
  
      <div className="h-[calc(100%-30px)] w-full relative">
        {dataMsg.length !== 0 ? (
          <div ref={chartContainerRef} className="h-full w-full" />
        ) : (
          <div className="flex items-center justify-center relative h-2/3 w-auto mx-auto">
            <div className="absolute inset-0 z-10" style={backgroundStyle}></div>
            <div className="absolute z-10 text-center">
              <p className="text-white text-lg mb-3 font-bold">
                This memecoin has no trades yet! 🚀
                <br />
                Be the first One and get an Airdrop!
              </p>
              <button
                onClick={handleDonateClick}
                className="bg-yellow-500 text-black py-3 px-8 rounded-full text-xl font-semibold shadow-md hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300"
              >
                Airdrop
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
  
};

export default TradingViewChart;